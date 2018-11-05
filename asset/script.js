var app = angular.module('cart', ['ngMessages', 'ngRoute']);

app.run(['$rootScope', function ($rootScope) {
  $rootScope.articleArray = [];
}]);

app.controller('product', ['$scope', '$routeParams', '$rootScope', function($scope, $routeParams, $rootScope) {
  $scope.addCart = function(idProduct, titleProduct, priceProduct, pictureProduct, amountProduct, descriptionProduct) {
    var numberArray = $rootScope.articleArray.length;
    if(numberArray == 0) {
      $rootScope.articleArray.push({
        id: idProduct,
        name: titleProduct,
        price: priceProduct,
        picture: pictureProduct,
        amount: amountProduct,
        description: descriptionProduct
      });
    } else {
      for(var i = 0; i < numberArray ; i++) {
        if($rootScope.articleArray[i].id == idProduct) {
          var existProduct = 1;
          $rootScope.articleArray[i].amount++;
        }
      }
      if (existProduct != 1) {
        $rootScope.articleArray.push({
          id: idProduct,
          name: titleProduct,
          price: priceProduct,
          picture: pictureProduct,
          amount: amountProduct,
          description: descriptionProduct
        });
      }
    }
  };
}]);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'view/accueil.html',
    controller : 'product'
  })

  .when('/cart', {
    templateUrl : 'view/panier.html',
    controller : 'product'
  })

  .when('/contact', {
    templateUrl : 'view/contact.html',
    controller : 'product'
  })

  .when('/hero', {
    templateUrl : 'view/superheros.html',
    controller : 'product'
  })

  .when('/fiction', {
    templateUrl : 'view/sf.html',
    controller : 'product'
  })

  .when('/horror', {
    templateUrl : 'view/horreur.html',
    controller : 'product'
  })

  .when('/unavoidable', {
    templateUrl : 'view/incontournables.html',
    controller : 'product'
  })

  .when('/humor', {
    templateUrl : 'view/humour.html',
    controller : 'product'
  })
});
