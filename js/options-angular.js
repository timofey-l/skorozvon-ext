var background = chrome.extension.getBackgroundPage().background;
background.primaApi.getFullUserInfo();
var optionsApp = angular.module('optionsApp', ['ngRoute', 'ngSanitize']);

optionsApp.directive('phone', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            if (ctrl) {
                ctrl.$validators.phone = function (modelValue) {
                    return ctrl.$isEmpty(modelValue) || isValidNumber(modelValue);
                }
            }
        }
    }
});

/**
 * Settings controller
 */
optionsApp.controller('settingsCtrl', function ($scope, $route, $routeParams, $location) {
    window.s = $scope;
    $scope.t = window.t;

    $scope.background = background;
    $scope.settings = background._settings;
    $scope.primaApi = background.primaApi;

    $scope.changeLang = function () {
        if ($scope.settings.lang == 'ru') {
            $scope.settings.lang = 'en';
        } else {
            $scope.settings.lang = 'ru';
        }
    };

    if (true) {
        var arrCountry = new Array();
        arrCountry.push({code: 'AF', name: "Afghanistan"});
        arrCountry.push({code: 'AL', name: "Albania"});
        arrCountry.push({code: 'DZ', name: "Algeria"});
        arrCountry.push({code: 'AS', name: "American Samoa"});
        arrCountry.push({code: 'AD', name: "Andorra"});
        arrCountry.push({code: 'AO', name: "Angola"});
        arrCountry.push({code: 'AI', name: "Anguilla"});
        arrCountry.push({code: 'AQ', name: "Antarctica"});
        arrCountry.push({code: 'AG', name: "Antigua And Barbuda"});
        arrCountry.push({code: 'AR', name: "Argentina"});
        arrCountry.push({code: 'AM', name: "Armenia"});
        arrCountry.push({code: 'AW', name: "Aruba"});
        arrCountry.push({code: 'AC', name: "Ascension Island"});
        arrCountry.push({code: 'AU', name: "Australia"});
        arrCountry.push({code: 'AT', name: "Austria"});
        arrCountry.push({code: 'AZ', name: "Azerbaijan"});
        arrCountry.push({code: 'BS', name: "Bahamas"});
        arrCountry.push({code: 'BH', name: "Bahrain"});
        arrCountry.push({code: 'BD', name: "Bangladesh"});
        arrCountry.push({code: 'BB', name: "Barbados"});
        arrCountry.push({code: 'BY', name: "Belarus"});
        arrCountry.push({code: 'BE', name: "Belgium"});
        arrCountry.push({code: 'BZ', name: "Belize"});
        arrCountry.push({code: 'BJ', name: "Benin"});
        arrCountry.push({code: 'BM', name: "Bermuda"});
        arrCountry.push({code: 'BT', name: "Bhutan"});
        arrCountry.push({code: 'BO', name: "Bolivia"});
        arrCountry.push({code: 'BA', name: "Bosnia And Herzegovina"});
        arrCountry.push({code: 'BW', name: "Botswana"});
        arrCountry.push({code: 'BV', name: "Bouvet Island"});
        arrCountry.push({code: 'BR', name: "Brazil"});
        arrCountry.push({code: 'IO', name: "British Indian Ocean Territory"});
        arrCountry.push({code: 'BN', name: "Brunei"});
        arrCountry.push({code: 'BG', name: "Bulgaria"});
        arrCountry.push({code: 'BF', name: "Burkina Faso"});
        arrCountry.push({code: 'BI', name: "Burundi"});
        arrCountry.push({code: 'KH', name: "Cambodia"});
        arrCountry.push({code: 'CM', name: "Cameroon"});
        arrCountry.push({code: 'CA', name: "Canada"});
        arrCountry.push({code: 'CV', name: "Cape Verde"});
        arrCountry.push({code: 'KY', name: "Cayman Islands"});
        arrCountry.push({code: 'CF', name: "Central African Republic"});
        arrCountry.push({code: 'TD', name: "Chad"});
        arrCountry.push({code: 'CL', name: "Chile"});
        arrCountry.push({code: 'CN', name: "China"});
        arrCountry.push({code: 'CX', name: "Christmas Island"});
        arrCountry.push({code: 'CC', name: "Cocos (Keeling) Islands"});
        arrCountry.push({code: 'CO', name: "Columbia"});
        arrCountry.push({code: 'KM', name: "Comoros"});
        arrCountry.push({code: 'CG', name: "Congo"});
        arrCountry.push({code: 'CK', name: "Cook Islands"});
        arrCountry.push({code: 'CR', name: "Costa Rica"});
        arrCountry.push({code: 'CI', name: "Cote D'Ivorie (Ivory Coast)"});
        arrCountry.push({code: 'HR', name: "Croatia (Hrvatska)"});
        arrCountry.push({code: 'CU', name: "Cuba"});
        arrCountry.push({code: 'CY', name: "Cyprus"});
        arrCountry.push({code: 'CZ', name: "Czech Republic"});
        arrCountry.push({code: 'CD', name: "Democratic Republic Of Congo (Zaire)"});
        arrCountry.push({code: 'DK', name: "Denmark"});
        arrCountry.push({code: 'DJ', name: "Djibouti"});
        arrCountry.push({code: 'DM', name: "Dominica"});
        arrCountry.push({code: 'DO', name: "Dominican Republic"});
        arrCountry.push({code: 'TL', name: "East Timor"});
        arrCountry.push({code: 'EC', name: "Ecuador"});
        arrCountry.push({code: 'EG', name: "Egypt"});
        arrCountry.push({code: 'SV', name: "El Salvador"});
        arrCountry.push({code: 'GQ', name: "Equatorial Guinea"});
        arrCountry.push({code: 'ER', name: "Eritrea"});
        arrCountry.push({code: 'EE', name: "Estonia"});
        arrCountry.push({code: 'ET', name: "Ethiopia"});
        arrCountry.push({code: 'FK', name: "Falkland Islands (Malvinas)"});
        arrCountry.push({code: 'FO', name: "Faroe Islands"});
        arrCountry.push({code: 'FJ', name: "Fiji"});
        arrCountry.push({code: 'FI', name: "Finland"});
        arrCountry.push({code: 'FR', name: "France"});
        arrCountry.push({code: 'FX', name: "France, Metropolitan"});
        arrCountry.push({code: 'GF', name: "French Guinea"});
        arrCountry.push({code: 'PF', name: "French Polynesia"});
        arrCountry.push({code: 'TF', name: "French Southern Territories"});
        arrCountry.push({code: 'GA', name: "Gabon"});
        arrCountry.push({code: 'GM', name: "Gambia"});
        arrCountry.push({code: 'GE', name: "Georgia"});
        arrCountry.push({code: 'DE', name: "Germany"});
        arrCountry.push({code: 'GH', name: "Ghana"});
        arrCountry.push({code: 'GI', name: "Gibraltar"});
        arrCountry.push({code: 'GR', name: "Greece"});
        arrCountry.push({code: 'GL', name: "Greenland"});
        arrCountry.push({code: 'GD', name: "Grenada"});
        arrCountry.push({code: 'GP', name: "Guadeloupe"});
        arrCountry.push({code: 'GU', name: "Guam"});
        arrCountry.push({code: 'GT', name: "Guatemala"});
        arrCountry.push({code: 'GN', name: "Guinea"});
        arrCountry.push({code: 'GW', name: "Guinea-Bissau"});
        arrCountry.push({code: 'GY', name: "Guyana"});
        arrCountry.push({code: 'HT', name: "Haiti"});
        arrCountry.push({code: 'HM', name: "Heard And McDonald Islands"});
        arrCountry.push({code: 'HN', name: "Honduras"});
        arrCountry.push({code: 'HK', name: "Hong Kong"});
        arrCountry.push({code: 'HU', name: "Hungary"});
        arrCountry.push({code: 'IS', name: "Iceland"});
        arrCountry.push({code: 'IN', name: "India"});
        arrCountry.push({code: 'ID', name: "Indonesia"});
        arrCountry.push({code: 'IR', name: "Iran"});
        arrCountry.push({code: 'IQ', name: "Iraq"});
        arrCountry.push({code: 'IE', name: "Ireland"});
        arrCountry.push({code: 'IM', name: "Isle of Man"});
        arrCountry.push({code: 'IL', name: "Israel"});
        arrCountry.push({code: 'IT', name: "Italy"});
        arrCountry.push({code: 'JM', name: "Jamaica"});
        arrCountry.push({code: 'JP', name: "Japan"});
        arrCountry.push({code: 'JO', name: "Jordan"});
        arrCountry.push({code: 'KZ', name: "Kazakhstan"});
        arrCountry.push({code: 'KE', name: "Kenya"});
        arrCountry.push({code: 'KI', name: "Kiribati"});
        arrCountry.push({code: 'KW', name: "Kuwait"});
        arrCountry.push({code: 'KG', name: "Kyrgyzstan"});
        arrCountry.push({code: 'LA', name: "Laos"});
        arrCountry.push({code: 'LV', name: "Latvia"});
        arrCountry.push({code: 'LB', name: "Lebanon"});
        arrCountry.push({code: 'LS', name: "Lesotho"});
        arrCountry.push({code: 'LR', name: "Liberia"});
        arrCountry.push({code: 'LY', name: "Libya"});
        arrCountry.push({code: 'LI', name: "Liechtenstein"});
        arrCountry.push({code: 'LT', name: "Lithuania"});
        arrCountry.push({code: 'LU', name: "Luxembourg"});
        arrCountry.push({code: 'MO', name: "Macau"});
        arrCountry.push({code: 'MK', name: "Macedonia"});
        arrCountry.push({code: 'MG', name: "Madagascar"});
        arrCountry.push({code: 'MW', name: "Malawi"});
        arrCountry.push({code: 'MY', name: "Malaysia"});
        arrCountry.push({code: 'MV', name: "Maldives"});
        arrCountry.push({code: 'ML', name: "Mali"});
        arrCountry.push({code: 'MT', name: "Malta"});
        arrCountry.push({code: 'MH', name: "Marshall Islands"});
        arrCountry.push({code: 'MQ', name: "Martinique"});
        arrCountry.push({code: 'MR', name: "Mauritania"});
        arrCountry.push({code: 'MU', name: "Mauritius"});
        arrCountry.push({code: 'YT', name: "Mayotte"});
        arrCountry.push({code: 'MX', name: "Mexico"});
        arrCountry.push({code: 'FM', name: "Micronesia"});
        arrCountry.push({code: 'MD', name: "Moldova"});
        arrCountry.push({code: 'MC', name: "Monaco"});
        arrCountry.push({code: 'MN', name: "Mongolia"});
        arrCountry.push({code: 'ME', name: "Montenegro"});
        arrCountry.push({code: 'MS', name: "Montserrat"});
        arrCountry.push({code: 'MA', name: "Morocco"});
        arrCountry.push({code: 'MZ', name: "Mozambique"});
        arrCountry.push({code: 'MM', name: "Myanmar (Burma)"});
        arrCountry.push({code: 'NA', name: "Namibia"});
        arrCountry.push({code: 'NR', name: "Nauru"});
        arrCountry.push({code: 'NP', name: "Nepal"});
        arrCountry.push({code: 'NL', name: "Netherlands"});
        arrCountry.push({code: 'AN', name: "Netherlands Antilles"});
        arrCountry.push({code: 'NC', name: "New Caledonia"});
        arrCountry.push({code: 'NZ', name: "New Zealand"});
        arrCountry.push({code: 'NI', name: "Nicaragua"});
        arrCountry.push({code: 'NE', name: "Niger"});
        arrCountry.push({code: 'NG', name: "Nigeria"});
        arrCountry.push({code: 'NU', name: "Niue"});
        arrCountry.push({code: 'NF', name: "Norfolk Island"});
        arrCountry.push({code: 'KP', name: "North Korea"});
        arrCountry.push({code: 'MP', name: "Northern Mariana Islands"});
        arrCountry.push({code: 'NO', name: "Norway"});
        arrCountry.push({code: 'OM', name: "Oman"});
        arrCountry.push({code: 'PK', name: "Pakistan"});
        arrCountry.push({code: 'PW', name: "Palau"});
        arrCountry.push({code: 'PS', name: "Palestine"});
        arrCountry.push({code: 'PA', name: "Panama"});
        arrCountry.push({code: 'PG', name: "Papua New Guinea"});
        arrCountry.push({code: 'PY', name: "Paraguay"});
        arrCountry.push({code: 'PE', name: "Peru"});
        arrCountry.push({code: 'PH', name: "Philippines"});
        arrCountry.push({code: 'PN', name: "Pitcairn"});
        arrCountry.push({code: 'PL', name: "Poland"});
        arrCountry.push({code: 'PT', name: "Portugal"});
        arrCountry.push({code: 'PR', name: "Puerto Rico"});
        arrCountry.push({code: 'QA', name: "Qatar"});
        arrCountry.push({code: 'RE', name: "Reunion"});
        arrCountry.push({code: 'RO', name: "Romania"});
        arrCountry.push({code: 'RU', name: "Russia"});
        arrCountry.push({code: 'RW', name: "Rwanda"});
        arrCountry.push({code: 'SH', name: "Saint Helena"});
        arrCountry.push({code: 'KN', name: "Saint Kitts And Nevis"});
        arrCountry.push({code: 'LC', name: "Saint Lucia"});
        arrCountry.push({code: 'PM', name: "Saint Pierre And Miquelon"});
        arrCountry.push({code: 'VC', name: "Saint Vincent And The Grenadines"});
        arrCountry.push({code: 'SM', name: "San Marino"});
        arrCountry.push({code: 'ST', name: "Sao Tome And Principe"});
        arrCountry.push({code: 'SA', name: "Saudi Arabia"});
        arrCountry.push({code: 'SN', name: "Senegal"});
        arrCountry.push({code: 'RS', name: "Serbia"});
        arrCountry.push({code: 'SC', name: "Seychelles"});
        arrCountry.push({code: 'SL', name: "Sierra Leone"});
        arrCountry.push({code: 'SG', name: "Singapore"});
        arrCountry.push({code: 'SK', name: "Slovak Republic"});
        arrCountry.push({code: 'SI', name: "Slovenia"});
        arrCountry.push({code: 'SB', name: "Solomon Islands"});
        arrCountry.push({code: 'SO', name: "Somalia"});
        arrCountry.push({code: 'ZA', name: "South Africa"});
        arrCountry.push({code: 'GS', name: "South Georgia And South Sandwich Islands"});
        arrCountry.push({code: 'KR', name: "South Korea"});
        arrCountry.push({code: 'ES', name: "Spain"});
        arrCountry.push({code: 'LK', name: "Sri Lanka"});
        arrCountry.push({code: 'SD', name: "Sudan"});
        arrCountry.push({code: 'SR', name: "Suriname"});
        arrCountry.push({code: 'SJ', name: "Svalbard And Jan Mayen"});
        arrCountry.push({code: 'SZ', name: "Swaziland"});
        arrCountry.push({code: 'SE', name: "Sweden"});
        arrCountry.push({code: 'CH', name: "Switzerland"});
        arrCountry.push({code: 'SY', name: "Syria"});
        arrCountry.push({code: 'TW', name: "Taiwan"});
        arrCountry.push({code: 'TJ', name: "Tajikistan"});
        arrCountry.push({code: 'TZ', name: "Tanzania"});
        arrCountry.push({code: 'TH', name: "Thailand"});
        arrCountry.push({code: 'TG', name: "Togo"});
        arrCountry.push({code: 'TK', name: "Tokelau"});
        arrCountry.push({code: 'TO', name: "Tonga"});
        arrCountry.push({code: 'TT', name: "Trinidad And Tobago"});
        arrCountry.push({code: 'TN', name: "Tunisia"});
        arrCountry.push({code: 'TR', name: "Turkey"});
        arrCountry.push({code: 'TM', name: "Turkmenistan"});
        arrCountry.push({code: 'TC', name: "Turks And Caicos Islands"});
        arrCountry.push({code: 'TV', name: "Tuvalu"});
        arrCountry.push({code: 'UG', name: "Uganda"});
        arrCountry.push({code: 'UA', name: "Ukraine"});
        arrCountry.push({code: 'AE', name: "United Arab Emirates"});
        arrCountry.push({code: 'GB', name: "United Kingdom"});
        arrCountry.push({code: 'US', name: "United States"});
        arrCountry.push({code: 'UM', name: "United States Minor Outlying Islands"});
        arrCountry.push({code: 'UY', name: "Uruguay"});
        arrCountry.push({code: 'UZ', name: "Uzbekistan"});
        arrCountry.push({code: 'VU', name: "Vanuatu"});
        arrCountry.push({code: 'VA', name: "Vatican City (Holy See)"});
        arrCountry.push({code: 'VE', name: "Venezuela"});
        arrCountry.push({code: 'VN', name: "Vietnam"});
        arrCountry.push({code: 'VG', name: "Virgin Islands (British)"});
        arrCountry.push({code: 'VI', name: "Virgin Islands (US)"});
        arrCountry.push({code: 'WF', name: "Wallis And Futuna Islands"});
        arrCountry.push({code: 'EH', name: "Western Sahara"});
        arrCountry.push({code: 'WS', name: "Western Samoa"});
        arrCountry.push({code: 'YE', name: "Yemen"});
        arrCountry.push({code: 'YU', name: "Yugoslavia"});
        arrCountry.push({code: 'ZM', name: "Zambia"});
        arrCountry.push({code: 'ZW', name: "Zimbabwe"});
    }
    $scope.arrCountries = arrCountry;
    $scope.getCountry = function (code) {
        var res = null;
        $.each($scope.arrCountries, function (i, el) {
            if (el.code == code) res = el;
        });
        return res;
    };

    $scope.triggerCallRecord = function () {
        $('.switch').animate({opacity: 0.2});
        $('.loading_callrecord').animate({opacity: 1});
        var s = $scope;

        if ($scope.primaApi._settings.record_calls) {
            $scope.primaApi.disableService({
                service: 'call-recording',
                onSuccess: function (r) {
                    $('.switch.record_calls').animate({opacity: 1});
                    $('.loading_callrecord').animate({opacity: 0});
                    $scope.$digest();
                }
            });
        } else {
            $scope.primaApi.enableService({
                service: 'call-recording',
                onSuccess: function (r) {
                    $('.switch.record_calls').animate({opacity: 1});
                    $('.loading_callrecord').animate({opacity: 0});
                    $scope.$digest();
                }
            });
        }
    };

    $scope.$watch('primaApi._settings.recieve_incoming_messages', function (newV, oldV) {
        if (newV) {
            $scope.primaApi.enableListenEvents();
        } else {
            $scope.primaApi.disableListenEvents();
        }
    });

    $scope.goToCabinet = function (page) {
        $scope.primaApi.goToCabinet(page);
    };

    $scope.updateBallance = function () {
        $('.reloadBalance').addClass('fa-spin');
        $scope.primaApi.updateBallance(function(r){
            $('.reloadBalance').removeClass('fa-spin');
            
        })
    };

    /**
     * Сохранить и выйти
     */
    $scope.saveAndClose = function () {
        background.saveSettings();
        background.primaApi.saveSettings();
        window.close();
    }
});

/**
 * Login controller
 */
optionsApp.controller('loginCtrl', function ($scope, $route, $routeParams, $location) {
    background.primaApi._settings.recieve_incoming_messages = false;
    background.primaApi.disableListenEvents();

    window.s = $scope;
    $scope.t = window.t;

    $scope.settings = background._settings;
    $scope.primaApi = background.primaApi;

    $scope.changeLang = function () {
        if ($scope.settings.lang == 'ru') {
            $scope.settings.lang = 'en';
        } else {
            $scope.settings.lang = 'ru';
        }
    };

    $scope.login = function () {
        $('#my-content').fadeOut(300);
        $('body').css({cursor: 'wait'});
        $scope.primaApi.loginUser(function (success, error) {
            $('#my-content').fadeIn(300);
            $('body').css({cursor: 'default'});

            if (success) {
                $scope.primaApi.saveSettings();
                window.location.hash = '#/';
            } else {
                alert(error);
            }
        });
    };

    // Вход через социальные сети
    // получение списка сип номеров для последующего вывода
    $scope.loginSocial = function (type) {
        $('#my-content').fadeOut(300);
        $('body').css({cursor: 'wait'});
        $scope.primaApi.loginSocial(type, function (sips) {
            // $('#my-content').fadeIn(300);
            $('body').css({cursor: 'default'});
            if (sips) {
                $scope.prima_sips = sips;
                $('.prima-login-dialog .login-form').hide();
                $('.prima-login-dialog .sip-list').show();
                $('.prima-login-dialog').fadeIn(300);
                $scope.$digest();
                // window.location.hash = '#/settings';
            } else {
                alert(t('login_social_error'));
                $('#my-content').fadeIn(300);
            }
        });
    };

    $scope.lk_login = '';
    $scope.lk_password = '';
    $scope.prima_sips = [];
    $scope.showLoginPrimatel = function () {
        $('#my-content').fadeOut(300);
        $('.prima-login-dialog').fadeIn(300);
    };

    $scope.prima_login = function () {
        $scope.primaApi.getUserSIP({
            login: $scope.lk_login,
            password: $scope.lk_password
        }, function (res) {
            if (res !== false) {
                $scope.prima_sips = res;
                $('.prima-login-dialog .login-form').fadeOut(300);
                $('.prima-login-dialog .sip-list').fadeIn(300);
                $scope.$digest();
            } else {
                $scope.lk_login = '';
                $scope.lk_password = '';
                alert(t('error_prima_login'));
                $('#my-content').fadeIn(300);
                $('.prima-login-dialog').fadeOut(300);
            }
        });
    };

    $scope.loginPrima = function (sip) {
        $('.prima-login-dialog').fadeOut(300);
        $('body').css({cursor: 'wait'});

        if (!$scope.lk_login) {
            $scope.primaApi.loginSocialSip(sip.sip, function (r, data) {
                $('body').css({cursor: 'default'});
                if (r === true) {
                    setTimeout(function () {
                        window.location.hash = "#/settings";
                    }, 2000);
                } else {
                    $('.prima-login-dialog').fadeIn(300);
                    alert(data);
                }
            });

        } else {
            $scope.primaApi.loginPrimaUser({
                login: $scope.lk_login,
                password: $scope.lk_password,
                sip_login: sip.sip
            }, function (r, data) {
                $('body').css({cursor: 'default'});
                if (r === true) {
                    setTimeout(function () {
                        window.location.hash = "#/settings";
                    }, 2000);
                } else {
                    $('#my-content').fadeIn(300);
                    $('.prima-login-dialog').fadeOut(300);
                    alert(data);
                }
            });
        }
    }

});

/**
 * Registration controller
 */
optionsApp.controller('regCtrl', function ($scope, $route, $routeParams, $location) {
    window.s = $scope;
    $scope.t = window.t;

    $scope.classes = function (field_name) {
        if ($scope.reg_form[field_name])
            return {
                invalid: $scope.reg_form[field_name].$invalid && $scope.reg_form[field_name].$touched
            };
    };

    $scope.settings = background._settings;
    $scope.primaApi = background.primaApi;

    $scope.changeLang = function () {
        if ($scope.settings.lang == 'ru') {
            $scope.settings.lang = 'en';
        } else {
            $scope.settings.lang = 'ru';
        }
    };

    $scope.reg_info = {
        name: '',
        family_name: '',
        login: '',
        phone: '',
        email: '',
        currency: ''
    };

    $scope.agreed = false;
    $scope.errors = '';

    $scope.register = function () {
        $scope.errors = '';

        if ($scope.reg_form.$valid && $scope.agreed) {
            $scope.primaApi.register($scope.reg_info, function (res) {
                if (res.result == 1) {
                    if (res.data.need_action == 'enter_new_email_otp') {
                        window.location.hash = '#/register/confirm_email';
                    }
                    if (res.data.user_message) {
                        alert(res.data.user_message);
                    }
                } else {
                    $scope.errors = res.data;
                }
            });
        } else {
            for (prop in $scope.reg_form) {
                if (!/^\$/.test(prop))
                    $scope.reg_form[prop].$setTouched();
            }
            setTimeout(function () {
                $('form[name=reg_form] .invalid').addClass('attension');
                setTimeout(function () {
                    $('form[name=reg_form] .invalid').removeClass('attension');
                }, 300);
            }, 100);

        }
    };

    $scope.reg_confirm_code_email = '';
    $scope.reg_confirm_code_sms = '';
    $scope.sendEmailConfirm = function () {
        $('#confirm_registration').fadeOut(300);
        $scope.primaApi.confirmEmail($scope.reg_confirm_code_email, function (r) {
            if (r.result == 1) {
                if (r.data.need_action == 'enter_new_sms_otp') {
                    window.location.hash = "#/register/confirm_sms";
                }
            } else {
                $('#confirm_registration').fadeIn(300);
                if (confirm(t('reg_confirm_email_error'))) {
                    window.location.hash = "#/register";
                }
            }
        });
    };

    $scope.sendSMSConfirm = function () {
        $('#confirm_telephone').fadeOut(300);
        $('body').css('cursor', 'wait');
        $scope.primaApi.confirmSMS($scope.reg_confirm_code_sms, function (r) {
            $('body').css('cursor', 'default');
            if (r === true) {
                window.location.hash = "#/settings";
            } else {
                $('#confirm_telephone').fadeIn(300);
                if (confirm(t('reg_confirm_sms_error'))) {
                    window.location.hash = "#/register"
                }
            }
        });
    };

    $scope.reg_soc_type = '';
    $scope.registerSocial = function (type) {
        $scope.primaApi.registerSocial(type, function (r) {
            if (r.result == 1) {
                $scope.reg_info.soc_code = $scope.primaApi._soc_code;
                $scope.reg_info.name = r.data.soc_user_first_name;
                $scope.reg_info.family_name = r.data.soc_user_last_name;
                $scope.reg_soc_type = type;
                $scope.$digest();
            } else {
                alert(r.data);
            }
        });
    }

});

optionsApp.controller('recoverCtrl', function ($scope) {
    window.s = $scope;
    $scope.t = window.t;

    $scope.classes = function (field_name) {
        if ($scope.reg_form[field_name])
            return {
                invalid: $scope.reg_form[field_name].$invalid && $scope.reg_form[field_name].$touched
            };
    };

    $scope.settings = background._settings;
    $scope.primaApi = background.primaApi;

    $scope.changeLang = function () {
        if ($scope.settings.lang == 'ru') {
            $scope.settings.lang = 'en';
        } else {
            $scope.settings.lang = 'ru';
        }
    };

    $scope.step = 1;

    $scope.email = "";
    $scope.email_code = "";

    $scope.sendCodeToEmail = function () {
        $scope.restore_form.email.$setTouched();
        if ($scope.email.trim() == '') {
            $('[name=email]').focus();
            return;
        }
        $scope.primaApi.sendRestoreEmail($scope.email, function (r) {
            if (r.result == 1) {
                $scope.step = 2;
                $scope.$digest();
            } else {
                alert(r.data);
            }
        });
    };

    $scope.sendCode = function () {
        $scope.restore_form.code.$setTouched();
        if (typeof $scope.email_code == 'undefined' || $scope.email_code.trim() == '') {
            $('[name=code]').focus();
            return;
        }

        $('#forget_window').fadeOut(300);
        $('body').css({'cursor': 'wait'});
        $scope.primaApi.sendRestoreCode($scope.email_code, function (r, error) {
            $('body').css({'cursor': 'default'});
            if (r.result == 1) {
                $scope.primaApi._settings.sip_login = r.data.sip_login;
                $scope.primaApi._settings.sip_password = r.data.sip_password;
                $scope.primaApi.loginUser(function (res) {
                    if (res === true) {
                        $scope.primaApi.saveSettings();
                        window.location.hash = "#/settings";
                    } else {
                        $scope.step = 1;
                        $scope.email_code = "";
                        $scope.$digest();
                        $('#forget_window').fadeIn(300);
                        $('body').css({'cursor': 'default'});
                        alert(error);
                    }
                });

            } else {
                $scope.step = 1;
                $scope.$digest();
                $('#forget_window').fadeIn(300);

                alert(r.data);
            }
        });
    }

});

/**
 * Router rules
 */
optionsApp.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'partial/login.html'
        })
        .when('/settings', {
            controller: 'settingsCtrl',
            templateUrl: 'partial/settings.html'
        })
        .when('/recover', {
            controller: 'recoverCtrl',
            templateUrl: 'partial/recover_password.html'
        })
        .when('/register', {
            controller: 'regCtrl',
            templateUrl: 'partial/reg.html'
        })
        .when('/register/confirm_sms', {
            controller: 'regCtrl',
            templateUrl: 'partial/reg_confirm_sms.html'
        })
        .when('/register/confirm_email', {
            controller: 'regCtrl',
            templateUrl: 'partial/reg_confirm_email.html'
        })
        .otherwise({
            redirectTo: function () {
                //console.log(window.bg.bg.user);
                background = chrome.extension.getBackgroundPage().background;
                if (typeof background == 'object' && typeof background.primaApi.user != 'undefined'
                    && background.primaApi.user.loggedIn) {
                    return "/settings";
                } else {
                    return '/login';
                }
            }
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode({
        enabled: false
    });
});
