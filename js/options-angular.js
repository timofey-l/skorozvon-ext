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
    /**
     * Сохранить и выйти
     */
    $scope.saveAndClose = function() {
        background.saveSettings();
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
