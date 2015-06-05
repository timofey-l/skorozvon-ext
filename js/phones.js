window.onload = function () {
    window.bg_wnd = chrome.extension.getBackgroundPage();
    renderPopup(window.bg_wnd.background);
    $('.settings-button').click(function () {
        chrome.tabs.create({url:chrome.extension.getURL('/options.html')});
    });
};

function renderPopup(bg) {
    var user = bg.primaApi.user;
    $('.login .username').html( user.name);
    $('.balance .value').html(user.balance || "");

    // phones
    if (user.userName == '') {
        $('.login').hide();
        $('.balance').hide();
        $('.need-setup').show();
    }

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var tab_info = bg.tabs['tab_' + tabs[0].id] || null;
        if (tab_info == null) {
            return false;
        }
        var rows = tab_info.phones;
        var loggedIn = user.loggedIn;
        $.each(rows, function () {
            var number = this;

            //console.log(this);
            var phone_div = $('<div class="phone">' + this + '</div>');
            var buttons_div = $('<div class="buttons">');
            if (loggedIn) {
                buttons_div.append($('<div class="button btn_phone">').html('').click(function () {
                    bg.doCall(number);
                }));
                if (window.bg_wnd.background.primaApi.allowSMS())
                    buttons_div.append($('<div class="button btn_sms">').html('').click(function () {
                        bg.openSMSSend(number);
                    }));
            }

            phone_div.append(buttons_div);
            $('.list').append(phone_div);
        });
    });

}
