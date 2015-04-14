function setPhones(o) {
    $('#phoneFrom').val(o.from);
    $('#phoneTo').val(o.to);
}

$(document).ready(function(){
    $('.button-send').click(function () {
        var p1 = $('.phone_number1').val();
        var p2 = $('.phone_number2').val();
        var background = chrome.extension.getBackgroundPage().background;
        background.primaApi.connect2({
            caller: p1,
            callee: p2
        }, function(r) {
            if (r.result == 1) {
                window.close();
            } else {
                alert(r.data);
            }
        });
    });
});