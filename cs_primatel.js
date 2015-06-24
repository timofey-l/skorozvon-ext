if (window == top) {
    var Primatel = function () {
        this.port = chrome.extension.connect();
        this.port.onMessage.addListener(function (m, s, c) {
            var new_m = $.extend({
                method: "",
                data: null
            }, m);
            var r = this[new_m.method](new_m.data);
            if (c) c(r);
        });

        var self = this;

        this.phones = [];

        this._bg_settings = chrome.extension.sendMessage({method: 'getSettings'}, function (r) {
            self._bg_settings = r;
            primatel.parsePage();
        });
    };

    /**
     * Возвращает
     * @returns {Array}
     */
    Primatel.prototype.getPhones = function () {
        return this.phones || [];
    };

    /**
     * Парсинг страницы
     */
    Primatel.prototype.parsePage = function () {
        var a = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        var code = "RU";
        this.code = code;
        if (typeof this._bg_settings.default_country != 'undefined') {
            code = this._bg_settings.default_country.toUpperCase();
            this.code = code;
        }
        var n = a.getExampleNumber(code);

        var country_code = n.values_[1];
        this.country_code_length = n.values_[1].toString().length;
        this.number_length = n.values_[2].toString().length;

        var phones = [];
        var source = document.body.textContent;

        // отделяем в международном формате
        var re = RegExp('[+]?([\\s\\-‒—()]{0,2}\\d){11,12}', 'gmi');
        while ((m = re.exec(source)) != null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            var p = "+" + m[0].replace(/\D/g, '');
            if (isValidNumber(p, this._bg_settings.default_country))
                phones.push(p);
        }

        // отделяем локальные
        var re = RegExp('\\s([\\D]{0,2}\\d){' + (this.number_length) + '}\\s', 'gmi');
        while ((m = re.exec(source)) != null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            var p = "+" + country_code.toString() + m[0].replace(/\D/g, '');
            if (isValidNumber(p, this._bg_settings.default_country))
                phones.push(p);
        }


        phones = _.uniq(phones);
        this.phones = phones;
        chrome.extension.sendMessage({
            method: 'addTabInfo',
            data: {
                phones: this.phones
            }
        });

        //log(phones);

        inject_new(document.body);
    };
}