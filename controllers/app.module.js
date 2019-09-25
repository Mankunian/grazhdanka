angular.module('app', [
    // 'ngAnimate',
    'ui.bootstrap',
    'ngRoute',
    // 'ngSanitize',
    'ui.select',
    'zingchart-angularjs',
    'angular.factories',
    'dropdown-multiselect'
]);


angular.module('app').config(function ($routeProvider) {
    $routeProvider
        .when("/controllers/new_form", {
            templateUrl: "new_form.html"
        })
        .when("/controllers/index", {
            templateUrl: "index.html"
        })
        .when("/controllers/civil", {
            templateUrl: "civil.html"
        })


        .otherwise({redirectTo: '/'});
});
