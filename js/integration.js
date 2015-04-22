var Integration;

Integration = (function(){
    function Integration() {

    }

    /**
     * Соединение с API
     * @param callback
     */
    Integration.prototype.amoConnect = function (callback) {
        var amoLink = 'https://' + background._settings.amo_domain + '.amocrm.ru/private/api/auth.php?type=json';
        $.ajax(amoLink, {
            method: "POST",
            dataType: "json",
            data: {
                type: 'json',
                USER_LOGIN: background._settings.amo_email,
                USER_HASH: background._settings.amo_hash
            }
        }).success(function(data){
            if (data.response.auth) {
                if (callback) callback(true);
            } else {
                if (callback) callback(false);
            }
        }).error(function(){
            if (callback) callback(false);
        });
    };

    /**
     * Поиск контакта по номеру телефона
     */
    Integration.prototype.amoGetContact = function(phone, callback) {
        var amoLink = 'https://' + background._settings.amo_domain + '.amocrm.ru/private/api/v2/json/contacts/list';
        $.ajax(amoLink, {
            method: 'GET',
            dataType: 'json',
            data: {
                type: 'all',
                query: phone
            }
        }).success(function(data){
            //console.log(data);
            if (callback) callback(data);
        }).error(function(){
                if (callback) callback(false);
            });
    };

    Integration.prototype.GISFind = function(phone, city, key) {
        var res = null;
        $.ajax({
            async: false,
            url: 'http://catalog.api.2gis.ru/search',
            data: {
                key: key,
                version: '1.3',
                what: phone,
                sort: 'relevance',
                where: city
            }
        }).success(function (data) {
            if (data.result && data.result.length > 0) {
                res = data.result[0];
            }
        });
        return res;
    };

    return Integration;
})();