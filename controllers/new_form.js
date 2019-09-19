angular.module("app").controller("newFormCtrl", function ($scope, $http, $timeout, $uibModal, $log) {


    /*$scope.sendBtn = function (item) {
        console.log(item);

        var fd = new FormData();
        fd.append('file', item.file);
        $http.post(fd, {
            transformRequest: angular.identity,
            headers: {'Content-type': undefined}
        })
            .success(function (data) {

            })
            .error(function (error) {

            })
    };*/

    //Спиок категории дела

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
            console.log($scope.caseCategories)
        }, function (reason) {
            console.log(reason)
        });
    };

    $scope.getCaseCategoriesList();


    $scope.sendResultCivil = function (item) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalCivil.html',
            controller: modalCivil,
            size: 'lg',
            resolve: {
                value: function () {
                    return item
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

        });

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }
});

var modalCivil = function ($scope, $uibModalInstance, $http, value) {
    console.log(value);


    $scope.getResponse = function () {
        $http({
            url: 'https://api.zandylyq.kz/v1/civil/request',
            method: 'POST',
            // data: sendBodyObj,
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
            // console.log(value);
            $scope.tableData = value.data;
            console.log($scope.tableData)
        }, function (reason) {
            console.log(reason)
        });

        $uibModalInstance.close();
    };

    $scope.getResponse();


    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

};
