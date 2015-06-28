"use strict";
var Background;

Background = (function () {
    function Background() {
        this.version = '1.0.1rc';
        this._defaults = {
            // 1-web
            // 2-soft
            // 3-callback
            call_type: 1,
            default_phone: '',
            popup_delay: 1000, // 1 сек
            default_country: 'RU',
            lang: 'ru',
            sp_type: 'sip',

            // интеграция
            amo_domain: '',
            amo_email: '',
            amo_hash: '',
            amo_enabled: false,

            // 2GIS
            gis_code: '',
            gis_enabled: false

        };

        // вкладки
        this.tabs = {};

        // загрузка параметров
        this.loadSettings();

        // открытые диалоговые окна
        this._webPhoneWindow = null;
        this._smsWindow = null;
        this._callBackWindow = null;

        // при закрытии окна проверяем не одно ли из наших диалоговых
        // и обнуляем если так
        var self = this;
        chrome.windows.onRemoved.addListener(function (w_id) {
            if (self._webPhoneWindow != null && self._webPhoneWindow.id == w_id) {
                self._webPhoneWindow = null;
            }
            if (self._smsWindow != null && self._smsWindow.id == w_id) {
                self._smsWindow = null;
            }
            if (self._callBackWindow != null && self._callBackWindow.id == w_id) {
                self._callBackWindow = null;
            }
        });
        chrome.tabs.onRemoved.addListener(function (tabId) {
            delete(self.tabs['tab_' + tabId]);
        });
        // загрузка языка
        loadLang(this._settings.lang);


        // интеграция
        this.integration = new Integration();
        chrome.browserAction.onClicked.addListener(function (tab) {
            chrome.tabs.create({url: chrome.extension.getURL('/options.html')});
            return false;
        });
        chrome.extension.onMessage.addListener(this._process_message);
    }

    /**
     * Получение настроек
     */
    Background.prototype.getSettings = function () {
        return $.extend({
            allowSMS: this.primaApi.allowSMS()
        }, this._settings);
    };

    /**
     * Обработка сообщений от контентных скриптов
     */
    Background.prototype._process_message = function (message, sender, callback) {
        if (sender.id != chrome.runtime.id) {
            return;
        }

        if (DEBUG) {
            console.groupCollapsed('Получено сообщение!');
            logGC('message', message);
            logGC('sender', sender);
            logGC('callback', callback);
            console.groupEnd();
        }
        if (message.method) {
            var r = background[message.method](message.data, sender);
            callback(r);
        }
    };

    /**
     * Добавление информации о вкладке
     * @param data
     * @param sender
     */
    Background.prototype.addTabInfo = function (data, sender) {
        if (sender.tab) {
            this.tabs['tab_' + sender.tab.id.toString()] = data;
            this.tabs['tab_' + sender.tab.id.toString()].tabId = sender.tab.id;
            if (data.phones.length) {
                chrome.browserAction.setBadgeText({
                    text: data.phones.length.toString(),
                    tabId: sender.tab.id
                });
            } else {
                chrome.browserAction.setBadgeText({
                    text: "",
                    tabId: sender.tab.id
                });
            }
            chrome.browserAction.setPopup({tabId: sender.tab.id, popup: "phones.html"});
        }
    };

    /**
     * Загрузка настроек
     */
    Background.prototype.loadSettings = function () {
        var settings = storage_get('settings') || {};
        this._settings = $.extend(_.clone(this._defaults), settings);
    };


    /**
     * Сохранение настроек
     */
    Background.prototype.saveSettings = function () {
        storage_set('settings', this._settings);
    };


    /**
     * Совершение вызова на указанный номер
     * Если указан не указан тип вызова - то используется выбранный в натстройках
     *
     * @param phone - номер телефона
     * @param type - способ звонка
     */
    Background.prototype.doCall = function (phone) {
        var t = this._settings.call_type;

        switch (t) {
            case 1:
                this.openWebPhoner(phone);
                break;

            case 2:
                this.openSoftPhone(phone);
                break;

            case 3:
                this.openCallback(phone);
        }
    };

    Background.prototype.openSettingsPage = function() {
        chrome.tabs.create({url: chrome.extension.getURL('/options.html')});
    };

    /**
     * Звонок через софтфон
     * @param phone
     */
    Background.prototype.openSoftPhone = function(phone) {
        phone = formatE164(this._settings.default_country, phone);
        chrome.tabs.create({
            url:this._settings.sp_type + ":" +phone.replace(/[^\d+]/gmi,'')
        });
    };
    /**
     * Открывает окно с FlashPhoner и выполняет звонок на установленный номер
     *
     * @param phone - номер телефона
     */
    Background.prototype.openWebPhoner = function (phone) {
        if (this._webPhoneWindow != null) {
            chrome.windows.remove(this._webPhoneWindow.id);
        }

        var self = this;
        phone = formatE164(this._settings.default_country, phone);

        chrome.windows.create({
            type: 'popup',
            width: 280,
            height: 390,
            url: "http://skorozvon.primatel.ru/flashphoner.php"
        }, function (newWindow) {
            self._webPhoneWindow = newWindow;
            chrome.tabs.executeScript(newWindow.tabs[0].id, {
                code: "(function(){" +
                "document.getElementById('username').value = '" + self.primaApi._settings.sip_login + "';" +
                "document.getElementById('password').value = '" + self.primaApi._settings.sip_password + "';" +
                "document.getElementById('calleeText').value = '" + phone.replace(/[^\d]/gmi, '') + "';" +
                "var e = new KeyboardEvent('keyup');" +
                "document.getElementById('calleeText').dispatchEvent(e);" +
                "document.title = 'ПРИМАТЕЛЕКОМ';" +
                "})();",
                runAt: "document_idle",
                allFrames: true
            })
        })
    };

    /**
     * Открвает окно для отправки СМС.
     * Номер если укзан phone, то он будет вписан в поле телефон
     *
     * @param phone
     */
    Background.prototype.openSMSSend = function (phone) {
        if (this._smsWindow != null) {
            chrome.windows.remove(this._smsWindow.id);
        }

        // форматируем телефон
        phone = formatE164(this._settings.default_country, phone);
        var self = this;

        log('Открываем окно для СМС. Телефон:' + phone);
        chrome.windows.create({
            type: 'popup',
            width: 450,
            height: 430,
            url: chrome.extension.getURL('/sms.html')
        }, function (newWindow) {
            self._smsWindow = newWindow;
            setTimeout(function(){
                chrome.tabs.sendMessage(newWindow.tabs[0].id, {
                    method: 'setPhone',
                    data: phone
                });
            }, 500);
        });
    };


    /**
     * Открытие окна для соединения 2 телефонов
     *
     * @param phone
     */
    Background.prototype.openCallback = function(phone) {
        if (this._callBackWindow != null) {
            chrome.windows.remove(this._callBackWindow.id);
        }
        phone = formatE164(this._settings.default_country, phone);
        phone = phone.replace(/\D/g, '');
        var self = this;
        chrome.windows.create({
            url: chrome.extension.getURL('/callback.html'),
            width: 450,
            height: 430,
            type: 'popup'
        }, function (newWindow) {
            self._callBackWindow = newWindow;
            setTimeout(function () {
                chrome.tabs.sendMessage(newWindow.tabs[0].id, {
                    method: "setPhones",
                    data: {
                        from: self._settings.default_phone.replace(/\D/g, ''),
                        to: phone
                    }});
            }, 500);
        });
    };

    return Background;
})();
