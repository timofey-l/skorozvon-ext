var LANGS = {
    ru: {
        title: 'Отправить SMS',
        send: 'Отправить',
        callback_title: 'Соединение двух телефонов',
        connect: 'Соединить',
        sms_send_success: 'Сообщение успешно отправлено!\nСтоимость: ',

        settings_title: 'Настройки',
        settings_balance: 'Баланс',
        settings_username_title: 'Пользователь',
        settings_enter_other_credentails: 'Ввести другие учетные данные',
        settings_add_funds: 'Пополнить счет',
        settings_online_shop: 'Интернет-магазин',
        enter: 'Войти',
        enter_phone_number: 'Введите номер телефона',
        record_calls: 'Запись разговоров',
        popup_delay: 'Задержка появления всплывающего окна (мс)',
        default_country: 'Страна по умолчанию',
        crm_integration: 'Интеграция с CRM системами:',
        enable_notify: 'Включить уведомления <br> о входящих звонках:',
        save_settings: 'Сохранить настройки',
        enter_command: 'Введите команду',
        add_command: 'Добавить команду',
        exec_command: 'Выполнять <br> команду:',
        choose_country: 'Выбрать страну'

    },
    en: {
        title: 'Send SMS',
        send: 'Send',
        callback_title: 'Connect two phones',
        connect: 'Connect',
        sms_send_success: 'Message sent successfully!\nPrice: ',

        settings_title: 'Options',
        settings_balance: 'Ballance',
        settings_username_title: 'User',
        settings_enter_other_credentails: 'Enter other credentails',
        settings_add_funds: 'Add funds',
        settings_online_shop: 'Online-store',
        enter: 'Enter',
        enter_phone_number: 'Enter phone number',
        record_calls: 'Record calls',
        popup_delay: 'Popup show delay (ms)',
        default_country: 'Default country',
        crm_integration: 'CRM systems integration:',
        enable_notify: 'Enable notifications <br> about incomming calls:',
        save_settings: 'Save settings',
        enter_command: 'Enter command',
        add_command: 'Add command',
        exec_command: 'Execute <br> command:',
        choose_country: 'Choose country'
    }
};

function t(id) {
    var l = background._settings.lang;
    if (LANGS[l].hasOwnProperty(id)) {
        return LANGS[l][id];
    } else {
        return id;
    }
}

function update_langs(lang) {
    if (typeof lang != 'undefined') {
        $('#language').val(lang);
    }
    $('[data-text-id]').each(function(){
        var el = $(this);
        var id = el.data('text-id');
        if (t(id)) {
            el.html(t(id));
        }
    });
}

$(document).ready(function(){
    var background = chrome.extension.getBackgroundPage().background;
    update_langs(background._settings.lang);
});
