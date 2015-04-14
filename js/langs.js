var LANGS;
LANGS = {
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
        show_notify: 'Показывать <br/> уведомления',
        save_settings: 'Сохранить настройки',
        enter_command: 'Введите команду',
        add_command: 'Добавить команду',
        login_sip_login: 'Введите SIP логин',
        login_sip_password: 'Введите SIP пароль',
        login_title: 'Вход',
        login_forgot_password: 'Забыли пароль?',
        login_text: 'Авторизация в системе PRIMATELECOM <br/>Вы можете использовать данные аккаунта PRIMATELECOM',
        exec_command: 'Выполнять <br> команду:',
        login_button_title: 'Войти',
        login_social_text: 'Вы также можете воспользоваться своим логином на одном из популярных сайтов:',
        login_register: 'Зарегистроваться',
        choose_country: 'Выбрать страну',
        login_error: "Ошибка при подключении!",
        notify_text_incoming: 'Входящий вызов',
        login_social_error: "Ошибка при входе через социальную сеть",
        reg_title: "Регистрация в системе PrimaTelekom",

        reg_standard_title: "Стандартная <span>регистрация</span>",
        reg_social_title: "<span>Регистрация</span> через соц. сеть",
        reg_name_title: "Имя",
        reg_surname_title: "Фамилия",
        reg_login_title: "Логин",
        reg_phone_title: "Телефон",
        reg_email_title: "Эл. почта",
        reg_currency_title: "Выберите тип валюты",
        reg_currency_euro_title: "Евро",
        reg_currency_usd_title: "Доллар",
        reg_currency_rub_title: "Рубль",
        reg_info_star: "*Все поля формы должны быть корректно заполнены. На следующих этапах мы отправим письмо и SMS для подтверждения того, что Вы владеете указанными контактными данными.",
        reg_info_social_before: "Часть данных регистрационной формы будет заполнена из данных пользователя социальной сети. После нажатия на иконку соц. сети Вам потребуется авторизоваться. В дальнейшем вы сможете входить в личный кабинет через социальную сеть*.",
        reg_info_social_after: "* Вход через социальную сеть Вы сможете разрешить/запретить в любой момент из личного кабинета PrimaTelecom.",
        reg_confirm: "Для регистрации Вам необходимо ознакомиться с <a href=\"registration-contract.html\">договором</a> и принять его условия",
        reg_next: 'Далее >>',
        reg_success_message: '\
        <div class="logo"> \
            <img src="img/logo_auth.png" alt="Прима телеком">\
        </div> \
        <h4>Это успех!</h4> \
        <p>Благодарим Вас за регистрацию на нашем сайте.</p>\
        <p>Теперь Вам доступен вход в личный кабинет.</p>\
        <p>Учетные данные направлены Вам электронным письмом.</p>\
        <p>Оставайтесь с нами!</p>\
        <a class="go-to-personal-cabinet" href="#/settings">Перейти в личный кабинет</a>',
        reg_copyright: '© ПримаТелеком, 2014',
        reg_not_valid_warn: 'Все поля должны быть заполнены!'
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
        settings_enter_other_credentails: 'Enter other user name',
        settings_add_funds: 'Fill up',
        settings_online_shop: 'Online shop',
        enter: 'Enter',
        enter_phone_number: 'Enter your phone number',
        record_calls: 'Call record',
        popup_delay: 'Delay of popup display (ms)',
        default_country: 'Default country',
        crm_integration: 'Integration with CRM systems:',
        enable_notify: 'Enable notifications <br> about incomming calls:',
        show_notify: 'Display <br/> notifications',
        save_settings: 'Save settings',
        enter_command: 'Enter command',
        add_command: 'Add command',
        login_sip_login: 'Enter SIP login',
        login_sip_password: 'Enter SIP password',
        login_title: 'Sign in',
        login_button_title: 'Sign in',
        login_forgot_password: 'Forgot password?',
        login_social_text: 'You may also use your login on one of the popular websites:',
        login_text: 'Authorization in system PRIMATELECOM <br/>You may use PRIMATELECOM account data',
        exec_command: 'Run <br> command:',
        login_register: 'Get registered',
        choose_country: 'Select the country',
        login_error: "Error while signing in!",
        notify_text_incoming: 'Incoming call',
        login_social_error: "Error while logging with social network account",
        reg_title: "Authorization in system PrimaTelecom",

        reg_standard_title: "Standard <span>registration</span>",
        reg_social_title: "<span>Registration</span> via social network",
        reg_name_title: "Name",
        reg_surname_title: "Surname",
        reg_login_title: "Login",
        reg_phone_title: "Phone",
        reg_email_title: "Email",
        reg_currency_title: "Choose the currency",
        reg_currency_euro_title: "Euro",
        reg_currency_usd_title: "US dollar",
        reg_currency_rub_title: "Rouble",
        reg_info_star: "*All fields should be correctly filled out. After that we'll send you an email and SMS to confirm that you know the above contact details.",
        reg_info_social_before: "Part of the registration form data will be filled out with use of the social network user information. After clicking on the soc.icon, you will need to get authorized in social network. In the future you will be able to enter your personal account through a social network*.",
        reg_info_social_after: "* You can enable/disable authorization via social network at any moment in your PrimaTelecom personal account.",
        reg_confirm: "To finish registration, you need to reed <a href=\"registration-contract.html\">the agreement</a> and accept its conditions.",
        reg_next: 'Continue >>',
        reg_success_message: '\
        <div class="logo"> \
            <img src="img/logo_auth.png" alt="Prima telecom">\
        </div> \
        <h4>Success!</h4> \
        <p>Thank you for registration on our website.</p>\
        <p>Now you have access to your personal account.</p>\
        <p>Your personal data was sent to your email.</p>\
        <p>Keep staying with us!</p>\
        <a class="go-to-personal-cabinet" href="#/settings">Go to your personal account</a>',
        reg_copyright: '© PrimaTelecom, 2014',
        reg_not_valid_warn: 'All fields must be correctly filled'

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
