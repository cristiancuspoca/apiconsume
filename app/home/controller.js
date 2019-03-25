'use strict';

angular.module('apiMovies.controllersHome', ['ngRoute', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', function($scope, moviesAPIservice) {
    $scope.query = null;
    $scope.responseQuery = [];

    $scope.pageSize = 5;
    $scope.totalResults = 0;
    $scope.pagination = {current: 1};
    $scope.mappedPages = [];
    $scope.itemselect = {};
    $scope.modalShown = false;

    const numPages = (n,m) => n/m;

    $scope.changeSearch = () => {
        if ($scope.query.length > 3) {
            callApi($scope.query, 1);
        }
    }

    function callApi(q, p, init = 0, end = $scope.pageSize) {
        $scope.responseQuery = [];
        moviesAPIservice.search(q, p).then( (response) => {
            // Numero de resultados totales
            let total_results = response.total_results; 
            // Numero total de paginas
            let total_pages = response.total_pages;
            // Pagina Actual
            let pageApi = response.page;
            // Datos retornado (Filtrados)
            let originalResults = response.results;
            // Total de datos enviados
            let totalFilter = originalResults.length;

            $scope.mappedPages = [];
            for(let i = 0; i < total_pages; i++) {
                let total = totalFilter;
                for(let j = 0; j < Math.ceil(total / $scope.pageSize); j++) {
                    let obj = {
                        pageApi: (i + 1),
                        init: j * $scope.pageSize,
                        end: (j * $scope.pageSize) + $scope.pageSize,
                    }
                    $scope.mappedPages.push(obj);
                }
            }
            angular.forEach(originalResults, (value, key) => {
                if (key > ( init - 1 ) && key < end) {
                    $scope.responseQuery.push(value);
                }
            });
            $scope.totalResults = total_results;
            // console.log(originalResults);
        });
    }

    $scope.pageChanged = function(newPage) {
        getResultsPage($scope.query, newPage);
    };

    $scope.detailItem = function(obj) {
        if (!!obj) {
            moviesAPIservice.detail(obj.media_type, obj.id).then( (response) => {
                $scope.modalShown = true;
                $scope.itemselect = response;
                $scope.itemselect.media_type = obj.media_type;
                // console.log($scope.itemselect);
            });
        }
    }

    function getResultsPage(query, page) {
        let row = $scope.mappedPages[page - 1];
        callApi(query, row.pageApi, row.init, row.end);
        // console.log(row);
        // console.log($scope.mappedPages);

        /*if (row.pageApi != $scope.pageSearched) {
            callApi(query, row.pageApi, row.init, row.end);
        } else {
            $scope.responseQuery = [];
            angular.forEach(originalResults, (value, key) => {
                if (key > ((page * $scope.pageSize) - $scope.pageSize - 1) && key <= (page * $scope.pageSize - 1)) {
                    $scope.responseQuery.push(value);
                }
            });
        } */
    }
});