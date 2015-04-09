var PrimaApi;

PrimaApi = (function () {
    function PrimaApi() {
        var self = this;
        this.user = null;

        this._defaults = {
            apiUrl: "http://tp-api.primatel.ru/",
            svcUrl: "http://tp-svc.primatel.ru/",
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
                self.getFullUserInfo();
                self.getServices({
                    onSuccess: function (r) {
                        if (r.result == 1) {
                            self._services = r.data;
                        }
                    }
                });
            }
        });
    }

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
                            self.getServices({onSuccess:function(r){
                                if (typeof opt.onSuccess === 'function') {
                                    return opt.onSuccess(response);
                                }
                            }});
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
            onSuccess: function(r) {
                if (callback) callback(_.find(self._services, function (el) { return el.service == service; }) || false)
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
                            self.getServices({onSuccess:function(r){
                                if (typeof opt.onSuccess === 'function') {
                                    return opt.onSuccess(response);
                                }
                            }});
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

                var rc = _.find(self._services, function (el) { return el.service == 'call-recording'; });
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
