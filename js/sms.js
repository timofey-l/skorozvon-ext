function setPhone(phone) {
    log('Установка телефона');
    $('#phone').val(phone);
}

$(document).ready(function(){
    $('.button-send').click(function(){
        var p1 = $('.phone_number').val();
        var message = $('#sms_message').val();
        var background = chrome.extension.getBackgroundPage().background;
        background.primaApi.sendSMS(
            {
                phone: p1,
                message: message
            },
            function(data) {
                if (data.result == 1) {
                    var text = t('sms_send_success') + data.data.amount + " " + data.data.currency;
                    alert(text);
                    window.close();
                } else {
                    alert(data.data);
                }
            }
        );
    });
});