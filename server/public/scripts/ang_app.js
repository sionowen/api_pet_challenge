var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/dogs', {
      templateUrl: '/views/dogs.html',
      controller: "DogsController"
    })
    .when('/pigs', {
      templateUrl: '/views/pigs.html',
      controller: "PigsController"
    })
    .when('/cats', {
      templateUrl: '/views/cats.html',
      controller: "CatsController"
    })
    .otherwise({
      redirectTo: 'dogs'
    })
}]);


myApp.controller('APIController', ['$scope', '$http', function($scope, $http) {
  var key = 'dbe92a3331ae40f8de244e72527278c5';
  var baseURL = 'http://api.petfinder.com/';
  $scope.breed = '';

  $scope.getRandomAnimal = function(targetAnimal) {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + targetAnimal;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        $scope.breed = $scope.animal.animal.$t;
        $scope.getBreeds();
      }
    )
  }

  $scope.getBreeds = function() {
    var query = 'breed.list';
    query += '?key=' + key;
    query += '&animal=' + $scope.breed.toLowerCase();
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log('breeds: ', response.data);
        $scope.breeds = response.data.petfinder.breeds.breed;
      }
    )
  }

}]);
