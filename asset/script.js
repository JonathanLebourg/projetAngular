$(function () { // lancement des fonctions au chargement de la page
  // pop over fonction boostrap
  $('[data-toggle="popover"]').popover();

  // Navbar collapse off
  $(document).on('click','.navbar-collapse.show',function(e) {
    $(this).collapse('hide');
  });
}) // fin du doc ready

var app = angular.module('cart', ['ngMessages', 'ngRoute']);

app.run(['$rootScope', function ($rootScope) {
  $rootScope.articleArray = [];
}]);

app.controller('product', ['$scope', '$routeParams', '$rootScope', function($scope, $routeParams, $rootScope) {

  //Au click [ajouter au panier]
  $scope.addCart = function(idProduct, titleProduct, priceProduct, pictureProduct, amountProduct, descriptionProduct) {

    //Fonction ajout produit
    var addProduct = function ($rootScope) {
      $rootScope.articleArray.push({
        id: idProduct,
        name: titleProduct,
        price: priceProduct,
        picture: pictureProduct,
        amount: amountProduct,
        description: descriptionProduct,
        total: priceProduct
      });
    };

    //Vérification : si produit existe alors augmente la quantité sinon créer le produit
    var numberArray = $rootScope.articleArray.length;
    if(numberArray == 0) {
      addProduct(this);
    } else {
      for(var i = 0; i < numberArray ; i++) {
        if($rootScope.articleArray[i].id == idProduct) {
          var existProduct = 1;
          $rootScope.articleArray[i].amount++;
          var newPrice = $rootScope.articleArray[i].price * $rootScope.articleArray[i].amount;
          $rootScope.articleArray[i].total = newPrice;
        }
      }
      if (existProduct != 1) {
        addProduct(this);
      }
    }
  };
}]);

app.controller('bdDataCtrl',['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $http.get('asset/bd-data.json')
  .then(function(response) {
    $scope.datas = response.data;
  });

  //Au click [+]
  $scope.moreProduct = function(idProduct) {
    var numberArray = $rootScope.articleArray.length;
    for(var i = 0; i < numberArray ; i++) {
      if($rootScope.articleArray[i].id == idProduct) {
        $rootScope.articleArray[i].amount++;
        var newPrice = $rootScope.articleArray[i].price * $rootScope.articleArray[i].amount;
        $rootScope.articleArray[i].total = newPrice;
      }
    }
  }

  //Au click [-]
  $scope.lessProduct = function(idProduct) {
    var numberArray = $rootScope.articleArray.length;
    for(var i = 0; i < numberArray ; i++) {
      if($rootScope.articleArray[i].id == idProduct) {
        $rootScope.articleArray[i].amount--;
        var newPrice = $rootScope.articleArray[i].price * $rootScope.articleArray[i].amount;
        $rootScope.articleArray[i].total = newPrice;
        if($rootScope.articleArray[i].amount == 0) {
          var indexProduct = $rootScope.articleArray.indexOf($rootScope.articleArray[i]);
          var indexDelete = 1;
        }
      }
    }
    if(indexDelete == 1) {
      $rootScope.articleArray.splice(indexProduct, 1);
    }
  }

  //Au click [Corbeille]
  $scope.deleteProduct = function(idProduct) {
    var numberArray = $rootScope.articleArray.length;
    for(var i = 0; i < numberArray ; i++) {
      if($rootScope.articleArray[i].id == idProduct) {
        $rootScope.articleArray[i].amount = 0;
        if($rootScope.articleArray[i].amount == 0) {
          var indexProduct = $rootScope.articleArray.indexOf($rootScope.articleArray[i]);
          var indexDelete = 1;
        }
      }
    }
    if(indexDelete == 1) {
      $rootScope.articleArray.splice(indexProduct, 1);
    }
  }

  //Total article

}]);


//Route
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'view/incontournables.html'
  })

  .when('/contact', {
    templateUrl : 'view/contact.html'
  })

  .when('/hero', {
    templateUrl : 'view/superheros.html',
    controller: 'product'
  })

  .when('/fiction', {
    templateUrl : 'view/sf.html',
    controller: 'product'
  })

  .when('/horror', {
    templateUrl : 'view/horreur.html',
    controller: 'product'
  })

  .when('/unavoidable', {
    templateUrl : 'view/incontournables.html',
    controller: 'product'
  })

  .when('/humor', {
    templateUrl : 'view/humour.html',
    controller: 'product'
  })
});
