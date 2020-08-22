
var app = angular.module('hapodcastia', []);    
app.controller('PodcastiaController', ["$scope", "$http", function($scope, $http){
    $scope.columns = 3;
    $scope.fetchSuccessfull = false
    $scope.getRows = function(array, columns) {
        var rows = [];
        var i,j,temparray, chunk = columns;
        for (i=0,j=array.length; i<j; i+=chunk) {
            temparray = array.slice(i, i+chunk);
      
            rows.push(temparray);
        }
        return rows;
    };
    $http.get('http://localhost:80/podcasts/').then(function(resp) {
        console.log('Success', resp);
        $scope.fetchSuccessfull = true;
        $scope.rows = $scope.getRows(resp.data, $scope.columns);
    }, function(err) {
        console.error('ERR', err);
        $scope.fetchSuccessfull = false;
    });
}]);


app.controller('SubmitController', ["$scope", "$http", function($scope, $http){
    $scope.columns = 3;
    $scope.fetchSuccessfull = false
    $scope.getRows = function(array, columns) {
        var rows = [];
        var i,j,temparray, chunk = columns;
        for (i=0,j=array.length; i<j; i+=chunk) {
            temparray = array.slice(i, i+chunk);
      
            rows.push(temparray);
        }
        return rows;
    };

    $scope.itunesToPodcastia = function(itunesResult) {
        return {
            'name' : itunesResult['trackName'],
            'description' : '',
            'image' : itunesResult['artworkUrl100'],
            'publisher' : itunesResult['artistName'],
            'url' : itunesResult['collectionViewUrl']
        }
    }

    $scope.searchItunes = function() {
        var postData = {
            searchTerm : encodeURIComponent($scope.searchTerm)
        };
        console.log(postData);
        $http({
            method: 'POST',
            url: 'http://localhost:80/itunes/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: postData
        }).then(function(resp) {
            console.log('Success', resp);
            $scope.fetchSuccessfull = true;
            $scope.rows = $scope.getRows(resp.data.map($scope.itunesToPodcastia), $scope.columns);
        }, function(err) {
            console.error('ERR', err);
            $scope.fetchSuccessfull = false;
        });
    };
}]);













