var DEBUG = true;

var log = function(v) {
    if (!DEBUG) return;
    console.log(v);
};

var logG = function(title, o) {
    if (!DEBUG) return;
    console.group(title);
    console.log(o);
    console.groupEnd();
};
var logGC = function(title, o) {
    if (!DEBUG) return;
    console.groupCollapsed(title);
    console.log(o);
    console.groupEnd();
};

var loadLang = function (lang) {
    var url = '/langs/' + lang + '.json';
    jQuery.get(url, null, function(data){
            background.lang = $.extend(background.lang, data);
        }, 'json');
};

var storage_get = function(key) {
    var json = localStorage.getItem(key);
    if (json == null)
        return undefined;
    try {
        return JSON.parse(json);
    } catch (e) {
        log("Couldn't parse json for " + key);
        return undefined;
    }
};

var storage_set = function(key, value) {
    if (value === undefined) {
        localStorage.removeItem(key);
        return;
    }
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (ex) {
        log(ex);
    }
};