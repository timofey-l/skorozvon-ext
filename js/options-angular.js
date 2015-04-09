var background = chrome.extension.getBackgroundPage().background;
var optionsApp = angular.module('optionsApp', ['ngRoute', 'ngSanitize']);

/**
 * Settings controller
 */
optionsApp.controller('settingsCtrl', function ($scope, $route, $routeParams, $location) {
    window.s = $scope;
    $scope.t = window.t;

    $scope.settings = background._settings;
    $scope.primaApi = background.primaApi;

    $scope.changeLang = function() {
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
        $.each($scope.arrCountries, function(i, el){
            if (el.code == code) res = el;
        });
        return res;
    };

    $scope.triggerCallRecord = function() {
        $('.switch').animate({opacity: 0.2});
        $('.loading_callrecord').animate({opacity: 1});
        var s = $scope;

        if ($scope.primaApi._settings.record_calls) {
            $scope.primaApi.disableService({
                service: 'call-recording',
                onSuccess: function(r) {
                    $('.switch.record_calls').animate({opacity: 1});
                    $('.loading_callrecord').animate({opacity: 0});
                    $scope.$digest();
                }
            });
        } else {
            $scope.primaApi.enableService({
                service: 'call-recording',
                onSuccess: function(r) {
                    $('.switch.record_calls').animate({opacity: 1});
                    $('.loading_callrecord').animate({opacity: 0});
                    $scope.$digest();
                }
            });
        }

    };

    /**
     * Сохранить и выйти
     */
    $scope.saveAndClose = function() {
        background.saveSettings();
        background.primaApi.saveSettings();
        //window.close();
    }
});

/**
 * Login controller
 */
optionsApp.controller('loginCtrl', function ($scope, $route, $routeParams, $location) {

});

/**
 * Registration controller
 */
optionsApp.controller('regCtrl', function ($scope, $route, $routeParams, $location) {

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
            redirectTo: function() {
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
