var app = angular.module('cart', ['ngMessages', 'ngRoute']);

app.run(['$rootScope', function ($rootScope) {
  $rootScope.articleArray = [];
}]);

app.controller('addProduct', ['$scope', '$routeParams', '$rootScope', function($scope, $routeParams, $rootScope) {
  $scope.addCart = function() {
    $rootScope.articleArray.push({
      id: $scope.id,
      name: $scope.name,
      amount: $scope.amount
    });
    console.log($rootScope.articleArray);
  };
}]);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'view/accueil.html',
    controller : 'addProduct'
  })

  .when('/cart', {
    templateUrl : 'view/panier.html',
    controller : 'addProduct'
  })

  .when('/contact', {
    templateUrl : 'view/contact.html',
    controller : 'addProduct'
  })

  .when('/hero', {
    templateUrl : 'view/superheros.html',
    controller : 'addProduct'
  })

  .when('/fiction', {
    templateUrl : 'view/sf.html',
    controller : 'addProduct'
  })

  .when('/horror', {
    templateUrl : 'view/horreur.html',
    controller : 'addProduct'
  })

  .when('/unavoidable', {
    templateUrl : 'view/incontournables.html',
    controller : 'addProduct'
  })

  .when('/humor', {
    templateUrl : 'view/humour.html',
    controller : 'addProduct'
  })
});
