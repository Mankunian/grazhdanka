var myApp = angular.module('app', ['ui.bootstrap', 'ngSanitize', 'ui.select', 'dropdown-multiselect']);

angular.module("app").controller("newFormCtrl", function ($scope, $http, $timeout, $uibModal, $log) {

    //Список категорий дел
    $scope.item = {};
    $scope.getCaseCategoriesList = function () {
        $http({
            url: 'https://api.zandylyq.kz/v1/civil/case-categories',
            method: 'GET',
            cache: false,
            contentType: false,
            async: true,
            processData: false,
            headers: {
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json; charset=utf-8',
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(function (value) {
            $scope.caseCategories = value.data;
            // console.log($scope.caseCategories.result);

            angular.forEach($scope.caseCategories, function (value) {
                $scope.configaa = {
                    options: value,
                    trackBy: 'id',
                    displayBy: ['id', 'name'],
                    divider: ':',
                    icon: 'glyphicon glyphicon-heart',
                    displayBadge: true,
                    height: '200px',
                    filter: true,
                    multiSelect: true,
                    preSelectItem: true,
                    preSelectAll: false
                };
            });


        }, function (reason) {
            console.log(reason)
        });
    };
    $scope.getCaseCategoriesList();


    //Список Судов
    $scope.item = {};
    $scope.getCourtsList = function () {
        $http({
            url: 'https://api.zandylyq.kz/v1/civil/courts',
            method: 'GET',
            cache: false,
            contentType: false,
            async: true,
            processData: false,
            headers: {
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json; charset=utf-8',
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(function (value) {
            $scope.courts = value.data;
            // console.log($scope.courts)
        }, function (reason) {
            console.log(reason)
        });
    };
    $scope.getCourtsList();


    //Список Результата рассмотрения

    $scope.item = {};
    $scope.getReviewResults = function () {
        $http({
            url: 'https://api.zandylyq.kz/v1/civil/review-results',
            method: 'GET',
            cache: false,
            contentType: false,
            async: true,
            processData: false,
            headers: {
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json; charset=utf-8',
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(function (value) {
            $scope.reviewResults = value.data;
            // console.log($scope.reviewResults)
        }, function (reason) {
            console.log(reason)
        });
    };
    $scope.getReviewResults();


    $scope.item.phrase_rule_type = '1';
    $scope.sendResultCivil = function (item, dateModel) {
        $scope.object = item;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalCivil.html',
            controller: modalCivil,
            size: 'lg',
            resolve: {
                value: function () {
                    return item
                },

                date: function () {
                    return dateModel
                },
                serverURL: function () {
                    return $scope.serverURL;
                }

            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
            $scope.object = {};

        });

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }

});

var modalCivil = function ($scope, $uibModalInstance, $http, value, date) {

    $scope.page = 1;
    $scope.itemsPerPage = 10;

    if (date) {
        value.date_from = date.date_from;
        value.date_to = date.date_to;


        if (value.date_from) {
            var mm = ((value.date_from.getMonth() < +1) < 10 ? '0' : '') + (value.date_from.getMonth() + 1);
            var dd = value.date_from.getDate();
            var yy = value.date_from.getFullYear();
            value.date_from = yy + '.' + mm + '.' + dd;
        }

        if (value.date_to) {

            var mm = ((value.date_to.getMonth() < +1) < 10 ? '0' : '') + (value.date_to.getMonth() + 1);
            var dd = value.date_to.getDate();
            var yy = value.date_to.getFullYear();
            value.date_to = yy + '.' + mm + '.' + dd;
        }

    }


    if (value.court) {
        value.court = value.court.id
    }

    if (value.case_category) {
        value.case_category = value.case_category.id;
    }
    if (value.review_result) {
        value.review_result = value.review_result.id;
    }

    console.log(value);


    $scope.getResponse = function () {


        $http({
            url: 'https://api.zandylyq.kz/v1/civil/request',
            method: 'POST',
            data: value,
            cache: false,
            contentType: false,
            async: true,
            processData: false,
            headers: {
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json; charset=utf-8',
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(function (value) {
            $scope.tableData = value.data;
            console.log($scope.tableData);


            angular.forEach($scope.tableData.result, function (value) {
                if (value.defendants) {
                    value.defendants = value.defendants.replace(/,/gi, " \n");

                }


            })
        }, function (reason) {
            console.log(reason)
        });

        $uibModalInstance.close(console.log('Закрыта модалка'));
    };
    $scope.getResponse();


    $scope.cancel = function () {

        $uibModalInstance.dismiss();
        value.case_number = '';
        value.court = '';
        value.category = '';
        value.result = '';
        console.log(value);
    };

};

