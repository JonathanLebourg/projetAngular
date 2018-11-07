$(function () { // lancement des fonctions au chargement de la page
  // pop over fonction boostrap
  $(document).on('click','[data-toggle="popover"]',function(e) {
    $(this).popover('show');
  });

  // Navbar collapse off
  $(document).on('click','.navbar-collapse.show',function(e) {
    $(this).collapse('hide');
  });
}) // fin du doc ready

var app = angular.module('cart', ['ngMessages', 'ngRoute']);

app.run(['$rootScope', function ($rootScope) {
  $rootScope.articleArray = [];
  $rootScope.totalPrice = 0;
  $rootScope.totalAmountProduct = 0;
}]);

app.controller('bdDataCtrl',['$scope', '$http', '$rootScope', '$filter', function($scope, $http, $rootScope, $filter) {
  $http.get('assets/json/bd-data.json')
  .then(function(response) {
    $scope.datas = response.data;
  });

  //Au click [+]
  $scope.moreProduct = function(idProduct) {
    var numberArray = $rootScope.articleArray.length;
    for(var i = 0; i < numberArray ; i++) {
      if($rootScope.articleArray[i].id == idProduct) {
        $rootScope.articleArray[i].amount++;
        var newPrice = parseFloat($rootScope.articleArray[i].price) * parseFloat($rootScope.articleArray[i].amount);
        $rootScope.articleArray[i].total = newPrice.toFixed(2);
        $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat($rootScope.articleArray[i].price);
        $rootScope.totalAmountProduct++;
      }
    }
  }

  //Au click [-]
  $scope.lessProduct = function(idProduct) {
    var numberArray = $rootScope.articleArray.length;
    for(var i = 0; i < numberArray ; i++) {
      if($rootScope.articleArray[i].id == idProduct) {
        $rootScope.articleArray[i].amount--;
        var newPrice = parseFloat($rootScope.articleArray[i].price) * parseFloat($rootScope.articleArray[i].amount);
        $rootScope.articleArray[i].total = newPrice.toFixed(2);
        $rootScope.totalPrice = parseFloat($rootScope.totalPrice) - parseFloat($rootScope.articleArray[i].price);
        $rootScope.totalAmountProduct--;
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
        var indexProduct = $rootScope.articleArray.indexOf($rootScope.articleArray[i]);
        var indexDelete = 1;
      }
    }
    if(indexDelete == 1) {
      $rootScope.totalPrice = parseFloat($rootScope.totalPrice) - parseFloat($rootScope.articleArray[indexProduct].total);
      $rootScope.totalAmountProduct = parseInt($rootScope.totalAmountProduct) - parseInt($rootScope.articleArray[indexProduct].amount);
      $rootScope.articleArray.splice(indexProduct, 1);
    }
  }


  //Au click [ajouter au panier]
  $scope.addCart = function(idProduct, titleProduct, priceProduct, pictureProduct, amountProduct, categoryProduct, refProduct, subtitleProduct, pictureProduct, altProduct) {
    //Fonction ajout produit
    var addProduct = function($rootScope) {
      $rootScope.articleArray.push({
        id: idProduct,
        name: titleProduct,
        price: priceProduct,
        picture: pictureProduct,
        amount: amountProduct,
        category: categoryProduct,
        total: priceProduct,
        ref: refProduct,
        subtitle: subtitleProduct,
        image: pictureProduct,
        alt: altProduct
      });
    };

    //Vérification : si produit existe alors augmente la quantité sinon créer le produit
    var numberArray = $rootScope.articleArray.length;
    if(numberArray == 0) {
      addProduct(this);
      $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat(this.data.price);
      $rootScope.totalAmountProduct++;
    } else {
      for(var i = 0; i < numberArray ; i++) {
        if($rootScope.articleArray[i].id == idProduct) {
          var existProduct = 1;
          $rootScope.articleArray[i].amount++;
          var newPrice = parseFloat($rootScope.articleArray[i].price) * parseFloat($rootScope.articleArray[i].amount);
          $rootScope.articleArray[i].total = newPrice.toFixed(2);
          $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat($rootScope.articleArray[i].price);
          $rootScope.totalAmountProduct++;
        }
      }
      if (existProduct != 1) {
        addProduct(this);
        $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat(this.data.price);
        $rootScope.totalAmountProduct++;
      }
    }
  };
}]);


//Route
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'view/incontournables.html'
  })

  .when('/hero', {
    templateUrl : 'view/superheros.html'
  })

  .when('/fiction', {
    templateUrl : 'view/sf.html'
  })

  .when('/horror', {
    templateUrl : 'view/horreur.html'
  })

  .when('/unavoidable', {
    templateUrl : 'view/incontournables.html'
  })

  .when('/humor', {
    templateUrl : 'view/humour.html'
  })

  .when('/goodies', {
    templateUrl : 'view/goodies.html'
  })
});
