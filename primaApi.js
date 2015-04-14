var PrimaApi;

PrimaApi = (function () {
    function PrimaApi() {
        var self = this;

        // информация о пользователе
        this.user = null;

        // соединение для приема входящих сообщений
        this.ws = null;

        // таймер для посылки PING что бы не закрывалось соединение
        this.keepAliveInterval = null;

        this._defaults = {
            apiUrl: "http://tp-api.primatel.ru/",
            svcUrl: "http://tp-svc.primatel.ru/",
            ws_url: 'ws://dapi.primatel.ru',
            ws_ping_interval: 50 * 1000, // в милисекундах секундах
            mode: 'json',
            lang: 'ru',
            sip_login: '',
            sip_password: '',
            record_calls: false,
            recieve_incoming_messages: false,
            show_notify: false,
            exec_command: false,
            commands: []
        };

        this._services = [];

        this.loadSettings();
        this.loginAPI(null, {
            onSuccess: function (response) {
                self.sid = response.data.sid;
                self.loginUser();
            }
        });
    }

    /**
     * Регистрация пользователя
     * @param data
     * @param callback
     */
    PrimaApi.prototype.register = function (data, callback) {
        var _data = {
            login: '',
            family_name: '',
            name: '',
            phone: '',
            email: '',
            currency: ''
        };
        _.extend(_data, data);
        this.DoRequest({
            svc: 'regRequest',
            sign: true,
            data: _data,
            onSuccess: function(res) {
                callback(res);
            }
        });
    };

    /**
     * Попытка логина через социальную сеть
     * @param type
     * @param callback
     */
    PrimaApi.prototype.loginSocial = function (type, callback) {
        this._soc_code = '';
        this._login_error = '';
        var self = this;
        this.getSocailAuthLink({
            data: {
                type: type
            },
            onSuccess: function (result) {
                if (result.result == 1) {
                    self._soc_code = result.data.soc_code;
                    chrome.windows.create({
                        type: 'popup',
                        url: result.data.url
                    }, function (newWindow) {
                        var win_id = newWindow.id;
                        chrome.windows.onRemoved.addListener(function (winId) {
                            if (winId == win_id) {
                                self.DoRequest({
                                    svc: 'socialAuthCheck',
                                    sign: true,
                                    data: {
                                        soc_code: self._soc_code
                                    },
                                    onSuccess: function (res) {
                                        if (res.result == 1) {
                                            if (res.data.lk_user_id > 0) {
                                                self.DoRequest({
                                                    svc: 'listSip2',
                                                    sign: true,
                                                    data: {
                                                        soc_code: self._soc_code
                                                    },
                                                    onSuccess: function (res) {
                                                        if (res.result == 1 && res.data.sip1) {
                                                            self._settings.sip_login = res.data.sip1;
                                                            self.DoRequest({
                                                                svc: 'getSipPassword2',
                                                                sign: true,
                                                                data: {
                                                                    soc_code: self._soc_code,
                                                                    sip_login: res.data.sip1
                                                                },
                                                                onSuccess: function (r) {
                                                                    if (r.result === 1 && (r.data.password)) {
                                                                        self._settings.sip_password = r.data.password;
                                                                        self.saveSettings();
                                                                        self.loginUser(function (success) {
                                                                            if (callback) callback(success);
                                                                        });
                                                                    } else {
                                                                        if (callback) callback(false);
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            if (callback) callback(false);
                                                        }
                                                    }
                                                });
                                            } else {
                                                if (callback) callback(false);
                                            }
                                        } else {
                                            if (callback) callback(false);
                                        }
                                    }
                                });
                            }
                        });
                    });
                } else {
                    self._login_error = result.data;
                    if (callback) callback(false);
                }
            }
        });
    };

    /**
     * Получение ссылки и soc_code для авторизации через социальные сети
     *
     * @param opts
     * @returns {*}
     */
    PrimaApi.prototype.getSocailAuthLink = function (opts) {
        if (opts == null) {
            opts = {};
        }
        var _opts = {
            svc: 'socialAuthGetLoginUrl',
            sign: true
        };

        _.extend(_opts, opts);

        return this.DoRequest(_opts);

    };

    /**
     * Попытка получить данные о пользователе по SIP логину и паролю
     *
     * @param callback
     */
    PrimaApi.prototype.loginUser = function (callback) {
        var self = this;
        if (this._settings.sip_login == '' || this._settings.sip_password == '') {
            if (callback) callback(false);
        }
        this.getFullUserInfo({
            onSuccess: function (r) {
                self.getServices({
                    onSuccess: function (res) {
                        if (res.result == 1) {
                            self._services = res.data;
                            if (self._settings.recieve_incoming_messages)
                                self.enableListenEvents();
                            if (callback) callback(true);
                        } else {
                            if (callback) callback(false, res.data);
                        }
                    }
                })
            }
        });
    };

    /**
     * Обработка входящих по WebSockets сообщений
     * @param event
     */
    PrimaApi.prototype.wsConnectionOnMessage = function (event) {
        logGC("WebSockets message recieved", event);
        var data = JSON.parse(event.data);
        if (data.data == 'pong') {
            log("WebSockets: 'keep-alive' message recieved");
            return;
        }
        if (data.svc && data.svc == 'incoming' && background.primaApi._settings.show_notify) {
            var opt = {
                type: "basic",
                title: formatInternational(background._settings.default_country, "+" + data.number_a),
                expandedMessage: "sdsd",
                message: t('notify_text_incoming')
                    .replace(/:caller/g, formatInternational(background._settings.default_country, "+" + data.number_a))
                    .replace(/:callee/g, formatInternational(background._settings.default_country, "+" + data.number_b))
                    .replace(/:time/g, data.time),
                iconUrl: chrome.extension.getURL('incoming.png')
            };
            chrome.notifications.create('', opt, function (id) {
            });
        }

    };

    /**
     * Обработка ошибок WebSockets
     * @param event
     */
    PrimaApi.prototype.wsConnectionOnClose = function (event) {
        logG("WebSockets error!", event);
        clearInterval(background.primaApi.keepAliveInterval);
        if (background.primaApi._settings.recieve_incoming_messages) {
            var timeInterval = Math.round(Math.random() * 14 * 1000) + 1000;

            setTimeout(function () {
                background.primaApi.enableListenEvents();
            }, timeInterval);
        }
    };

    /**
     * Включение входящих сообщений
     * @param callback
     */
    PrimaApi.prototype.enableListenEvents = function (callback) {
        var self = this;
        if (self._settings.recieve_incoming_messages && self.ws && self.ws.readyState == WebSocket.OPEN) {
            if (callback) callback(true);
            return;
        }
        this._settings.recieve_incoming_messages = true;
        this.wsConnect(function (result) {
            if (result === false) {
                // пытаемся переконнектиться по истечению произвольного промежутка времени в пределах
                // 1..15 секунд, при условии что в настройках включена соотв. опция
                if (self._settings.recieve_incoming_messages) {
                    var timeInterval = Math.round(Math.random() * 14 * 1000) + 1000;

                    setTimeout(function () {
                        if (self._settings.recieve_incoming_messages)
                            self.enableListenEvents();
                    }, timeInterval);
                }
                if (callback) callback(false);
            } else if (typeof result == 'object') {
                if (self.ws) {
                    self._settings.recieve_incoming_messages = false;
                    clearInterval(self.keepAliveInterval);
                    self.ws.close();
                }
                self._settings.recieve_incoming_messages = true;
                self.ws = result;
                self.keepAliveInterval = setInterval(function () {
                    if (self.ws && self.ws.readyState == 1)
                        self.ws.send(JSON.stringify({svc: 'ping'}));
                    else
                        clearInterval(self.keepAliveInterval);
                }, self._settings.ws_ping_interval);
                self.ws.onmessage = self.wsConnectionOnMessage;
                self.ws.onclose = self.wsConnectionOnClose;
                if (callback)
                    callback();
            }
            //if (callback) callback(result);
        });

    };

    /**
     * Выключение WebSockets подключения
     * @param callback
     */
    PrimaApi.prototype.disableListenEvents = function (callback) {
        if (background.primaApi._settings.recieve_incoming_messages === false) {
            if (callback) callback(true);
        }
        background.primaApi._settings.recieve_incoming_messages = false;
        if (background.primaApi.ws) background.primaApi.ws.close();
        if (callback) callback(true);
    };

    /**
     * Соединение по WebSockets для получения сообщений
     * @param callback
     * @returns {*}
     */
    PrimaApi.prototype.wsConnect = function (callback) {
        var data, self;
        self = this;
        data = {
            sip_login: this._settings.sip_login,
            sip_password: this._settings.sip_password,
            type: 'incoming'
        };
        return this.DoRequest({
            svc: 'eventRegisterReceiver',
            sign: true,
            data: data,
            onSuccess: function (response) {
                var wsc;
                if (response.result === 1) {
                    wsc = new WebSocket(self._settings.ws_url);
                    wsc.onopen = function () {
                        wsc.send(JSON.stringify({
                            svc: "setup",
                            lang: self.lang
                        }));
                        wsc.send(JSON.stringify({
                            svc: "registerReceiver",
                            code: response.data.code
                        }));
                        if (callback) {
                            return callback(wsc);
                        }
                    };
                    return wsc.onerror = function () {
                        if (callback) {
                            return callback(false);
                        }
                    };
                } else {
                    if (callback) {
                        return callback(false);
                    }
                }
            }
        });
    };

    /**
     * Отключение услуги
     * @param opt
     * @returns {*}
     */
    PrimaApi.prototype.disableService = function (opt) {
        var self;
        if (opt == null) {
            opt = {
                service: ''
            };
        }
        if (typeof opt.service === 'undefined' || opt.service === '') {
            return false;
        }
        self = this;
        return this.isServiceEnabled(
            opt.service,
            function (enabled) {
                if (enabled) {
                    return self.DoRequest({
                        svc: 'delService',
                        sign: true,
                        data: {
                            sip_login: self._settings.sip_login,
                            sip_password: self._settings.sip_password,
                            service: opt.service
                        },
                        onSuccess: function (response) {
                            self.getServices({
                                onSuccess: function (r) {
                                    if (typeof opt.onSuccess === 'function') {
                                        return opt.onSuccess(response);
                                    }
                                }
                            });
                        }
                    });
                }
            },
            true
        );
    };

    /**
     * Проверка подключена ли услуга
     * @param opt
     * @returns {*}
     */
    PrimaApi.prototype.isServiceEnabled = function (service, callback) {
        var self = this;
        this.getServices({
            onSuccess: function (r) {
                if (callback) callback(_.find(self._services, function (el) {
                    return el.service == service;
                }) || false)
            }
        });
    };

    /**
     * Подключение услуги
     * @param opt
     * @returns {*}
     */
    PrimaApi.prototype.enableService = function (opt) {
        var self;
        if (opt == null) {
            opt = {
                service: ''
            };
        }
        if (typeof opt.service === 'undefined' || opt.service === '') {
            return false;
        }

        self = this;
        return this.isServiceEnabled(
            opt.service,
            function (enabled) {
                if (!enabled) {
                    return self.DoRequest({
                        svc: 'addService',
                        sign: true,
                        data: {
                            sip_login: self._settings.sip_login,
                            sip_password: self._settings.sip_password,
                            service: opt.service
                        },
                        onSuccess: function (response) {
                            self.getServices({
                                onSuccess: function (r) {
                                    if (typeof opt.onSuccess === 'function') {
                                        return opt.onSuccess(response);
                                    }
                                }
                            });
                        }

                    });
                }
            },
            true
        );
    };
    /**
     * Получение списка подключенных услуг
     * @param opt
     * @returns {*}
     */
    PrimaApi.prototype.getServices = function (opt) {
        if (opt == null) {
            opt = {};
        }
        var self = this;
        return this.DoRequest({
            svc: 'listCurrentServices',
            sign: true,
            data: {
                sip_login: this._settings.sip_login,
                sip_password: this._settings.sip_password
            },
            onSuccess: function (r) {
                if (r.result == 1)
                    self._services = r.data;

                var rc = _.find(self._services, function (el) {
                    return el.service == 'call-recording';
                });
                if (rc) {
                    self._settings.record_calls = true;
                } else {
                    self._settings.record_calls = false;
                }
                self.saveSettings();
                if (typeof opt.onSuccess == 'function') {
                    return opt.onSuccess(r);
                }
            }
        });
    };

    /**
     * Выполняет запрос к API Примател
     * @param options
     * @returns {*}
     * @constructor
     */
    PrimaApi.prototype.DoRequest = function (options) {
        var _opt;
        if (options == null) {
            options = {};
        }
        _opt = {
            svc: '',
            base_url: 'svc',
            data: {},
            sign: false
        };
        _.extend(_opt, options);
        if (_opt.sign) {
            _opt.data = this.makeSign(_opt.data);
        }
        return $.ajax({
            async: true,
            data: _opt.data,
            type: 'POST',
            url: "" + this._settings[_opt.base_url + "Url"] + "?svc=" + _opt.svc + "&mode=" + this._settings.mode + "&lang=" + this._settings.lang,
            success: function (response, textStatus, jqXHR) {
                if (typeof _opt.onSuccess === 'function') {
                    return _opt.onSuccess(response, textStatus, jqXHR);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof _opt.onError === 'function') {
                    return _opt.onError(jqXHR, textStatus, errorThrown);
                }
            },
            complete: function (jqXHR, textStatus) {
                if (typeof _opt.onComplete === 'function') {
                    return _opt.onComplete;
                }
            }
        });
    };

    /**
     * Логин в API Примател для использования его функций
     * @param credentails
     * @param opt
     * @returns {*}
     */
    PrimaApi.prototype.loginAPI = function (credentails, opt) {
        var response, _opt;
        if (opt == null) {
            opt = {};
        }
        credentails = {
            login: 'tweedledum',
            password: 'RgA7Nwg4w'
        };
        _opt = {
            base_url: 'api',
            svc: 'login',
            data: credentails
        };
        _.extend(_opt, opt);
        return response = this.DoRequest(_opt);
    };

    /**
     * Загрузка настроек
     */
    PrimaApi.prototype.loadSettings = function () {
        var settings = storage_get('prima_settings') || {};
        this._settings = $.extend(_.clone(this._defaults), settings);
    };


    /**
     * Сохранение настроек
     */
    PrimaApi.prototype.saveSettings = function () {
        storage_set('prima_settings', this._settings);
    };


    /**
     * Создание подписи для запроса
     * @param data
     * @returns {*}
     */
    PrimaApi.prototype.makeSign = function (data) {
        var k, keys, str;
        data.rlogin = 'skorozvon';
        keys = [];
        for (k in data) {
            if (k !== 'lang' && k !== 'svc' && k !== 'mode') {
                keys.push(k);
            }
        }
        keys.sort();
        str = '';
        for (k in keys) {
            str += data[keys[k]] + ';';
        }
        str += 'fnm5j4fWb6Hg7W2m6fs4Hvhsu5jWbx6ryGse4nr';
        data.rsign = CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
        return data;
    };

    /**
     * Получение данных о пользователе
     * @param opt
     */
    PrimaApi.prototype.getFullUserInfo = function (opt) {
        if (opt == null) {
            opt = {};
        }
        var self = this;
        var res = {loggedIn: false, pending: true};

        // получаем данные пользователя
        // name, lk_login, lk_image_url, lk_avatar_url
        this.DoRequest({
            svc: 'getUserInfo',
            sign: true,
            data: {
                sip_login: this._settings.sip_login,
                sip_password: this._settings.sip_password
            },
            onSuccess: function (response) {
                if (response.result == 1) {
                    _.extend(res, response.data);
                    _.extend(res, {loggedIn: true});
                }
            }
        })
            // баланс
            .then(function () {
                return self.DoRequest({
                    svc: 'getBalance2',
                    data: {
                        sip_login: self._settings.sip_login,
                        sip_password: self._settings.sip_password
                    },
                    onSuccess: function (response) {
                        if (response.result == 1) {
                            _.extend(res, response.data);
                            _.extend(res, {loggedIn: true});
                        }
                    }
                });
            })
            .then(function () {
                _.extend(res, {pending: false});
                self.user = res;
                if (opt.onSuccess) {
                    opt.onSuccess(true);
                }
            })
        ;

        return res;
    };

    /**
     * Отправляет запрос на отправку СМС
     * @param opt
     * @param success
     * @returns {*}
     */
    PrimaApi.prototype.sendSMS = function (opt, success) {
        if (opt == null) {
            opt = {};
        }
        var self = this;
        var default_opts = {
            svc: 'sendSMS',
            data: {
                sip_login: this._settings.sip_login,
                sip_password: this._settings.sip_password
            }
        };
        _.extend(default_opts.data, opt);
        if (typeof success == 'function') {
            default_opts.onSuccess = success;
        }
        return this.DoRequest(default_opts);

    };

    /**
     * Соединение 2 телефонов
     * @param opt
     * @param success
     * @returns {*}
     */
    PrimaApi.prototype.connect2 = function (opt, success) {
        if (opt == null) {
            opt = {};
        }
        var self = this;
        var default_opts = {
            svc: 'connect2',
            data: {
                sip_login: this._settings.sip_login,
                sip_password: this._settings.sip_password
            }
        };
        _.extend(default_opts.data, opt);
        if (typeof success == 'function') {
            default_opts.onSuccess = success;
        }

        return this.DoRequest(default_opts);
    };

    return PrimaApi;

})();
