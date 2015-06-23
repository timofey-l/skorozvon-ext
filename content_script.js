if (window == top) {

    window.parseTimeout = null;

    chrome.extension.onConnect.addListener(function (port) {
        port.onMessage.addListener(factory);
    });
    function factory(obj) {
        if (obj && obj.method) {
            if (obj.data)
                window.primatel[obj.method](obj.data);
            else
                window.primatel[obj.method]();
        }
    }

    function wrap(el, find) {
        if (el.nodeType != 3) return;
        var w_el = document.createElement('span');

        var temp_data = el.data.toString();
        el.data = temp_data.substring(0, find.index);
        w_el.textContent = temp_data.substring(find.index, find[0].length + find.index);

        var after_node = document.createTextNode(temp_data.substring(find.index + find[0].length, temp_data.length));
        $(w_el).insertAfter(el);
        $(after_node).insertAfter(w_el);
        return w_el;
    }

    function searchPhone(phone) {
        var result = phone;
        if (primatel.phones)
            $.each(primatel.phones, function (index, el) {
                var re = new RegExp(phone.replace(/\D/g, '') + "$", "g");
                if (re.test(el) == true) {
                    result = el;
                }
            });
        return result;
    }

    function inject_new(element) {
        if (element.childNodes.length > 0) {
            for (var i = 0; i < element.childNodes.length; i++) {
                i += inject_new(element.childNodes[i]);
            }
        } else {
            // проверим на наличие телефона международном формате
            var re = RegExp('[+]?([\\s\\-()]{0,2}\\d){11,12}', 'gmi');
            //var re = /([ ()+-\s]{0,3}\d){11,12}/gmi;
            var phone = re.exec(element.textContent);
            if (phone != null) {
                var w_el = wrap(element, phone);
                addHover(w_el, searchPhone(phone[0]));
                return 1;
            }

            // проверим на наличие телефона в локальном формате
            var re = RegExp('([\\D]{0,2}\\d){' + (primatel.number_length) + '}', 'gmi');
            //var re = /([ ()+-\s]{0,3}\d){11,12}/gmi;
            var phone = re.exec(element.textContent);
            if (phone != null) {
                var w_el = wrap(element, phone);
                addHover(w_el, searchPhone(phone[0]));
                return 1;
            }

            // ищем по 7 цифрам с разделителем
            var re = RegExp('([\\D]{0,2}\\d){7}', 'gmi');
            //var re = /([ ()+-\s]{0,3}\d){11,12}/gmi;
            var phone = re.exec(element.textContent);
            if (phone != null) {
                var w_el = wrap(element, phone);
                addHover(w_el, searchPhone(phone[0]));
                return 1;
            }
        }
        return 0;
    }

    window.hover_timer = null;
    function addHover(el, phone) {
        $(el).hover(function () {
            phone = searchPhone(phone);
            if (window.hover_timer != null) clearTimeout(window.hover_timer);
            hover_timer = setTimeout(function () {
                if ($(el).is(':hover')) {
                    // detect layout
                    var layout = detect_layout(el);

                    // delete opened popups
                    $('.itd_phone_container').remove();

                    // creating popup inContent container
                    var c = $('<div class="itd_phone_container"></div>');
                    c.addClass('itd_' + layout.vert).addClass('itd_' + layout.hor);
                    c.css({
                        position: 'absolute',
                        opacity: 0,
                        background: '#ffffff',
                        color: "#000000",
                        'text-shadow': 'none',
                        'line-height' : "1",
                        //margin: 0,
                        padding: 0
                    });
                    $('body').append(c);
                    var phone_i = $('<div class="itd_phone_international">' + formatInternational(primatel.code, phone) +
                        '<a class="primatel_settings_button"></a></div>');

                    phone_i.find('.primatel_settings_button').click(function () {
                        chrome.extension.sendMessage({
                            method: 'openSettingsPage'
                        });
                    });
                    phone_i.css({
                        'margin-top': 0
                    });
                    c.append(phone_i);

                    var sipurl = "tel:+" + phone.replace(/[\D]/gmi, '');

                    var buttons_list_container = $('<div class="itd_buttons_list_container">' +
                        (window.primatel._bg_settings.allowSMS ? '<div class="primatel_sms_button"></div>' : '') +
                        '<div class="primatel_call_button"></div>' +
                        '</div>');

                    buttons_list_container.find('.primatel_call_button').click(function () {
                        chrome.extension.sendMessage({
                            method: 'doCall',
                            data: phone
                        });
                    });

                    buttons_list_container.find('.primatel_sms_button').click(function () {
                        chrome.extension.sendMessage({
                            method: 'openSMSSend',
                            data: phone
                        });
                    });

                    c.append(buttons_list_container);
                    // show
                    c.css({
                        top: $(el).offset().top - (layout.vert == 'bottom' ? c.height() - $(el).height() - 10 : 10 ),
                        left: $(el).offset().left - (layout.hor == 'right' ? c.width() - $(el).width() - 10 : 10 )
                    });
                    c.animate({opacity: 1}, {duration: 200});
                    c.mouseleave(function () {
                        var q = $(this);
                        $(this).animate({opacity: 0}, {
                            duration: 200,
                            complete: function () {
                                q.remove();
                            }
                        })
                    });
                }
                ;
            }, primatel._bg_settings.popup_delay);
        }).css('text-decoration', 'underline');
    }

    var detect_layout = function (el) {
        var bl = $('body').width() / 2;
        var bt = $('body').height() / 2;
        var el_l = $(el).offset().left + $(el).width() / 2;
        var el_t = $(el).offset().top + $(el).height() / 2;
        var l, t;
        if (bl < el_l) {
            l = 'right'
        } else {
            l = 'left'
        }
        if (bt < el_t) {
            t = 'bottom'
        } else {
            t = 'top'
        }
        return {
            class: t + '_' + l,
            vert: t,
            hor: l
        };
    };
    var primatel = new Primatel();
}
