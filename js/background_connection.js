function setVars(array) {
    for(i in array) {
        var el = array[i];
        if(
            typeof el == 'object'
            && typeof el.name != 'undefined'
            && typeof el.value != 'undefined'
        ) {
            window[el.name] = el.value;
        }
    }
}
chrome.extension.onMessage.addListener(function (message, sender) {
    log(message);
    log(typeof window[message.method] == 'function');
    if (typeof message == 'object'
    && typeof message.method == 'string'
    && message.method != ''
    && typeof window[message.method] == 'function') {

        if (typeof message.data != 'undefined') {
            window[message.method](message.data);
        } else {
            window[message.method]();
        }
    }
    if (typeof message == 'function') {
        message(window);
    }
});