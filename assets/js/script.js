// lancement des fonctions au chargement de la page
$(function () {
  // popover fonction boostrap
  $(document).on('click','#clickClose',function(e) {
    $('#exampleModalCenter').modal('hide');
  });

  // Navbar collapse off
  $(document).on('click','.navbar-collapse.show',function(e) {
    $(this).collapse('hide');
  });

  //Modal fermeture au click
  $(document).on('click','[data-toggle="popover"]',function(e) {
    $(this).popover('show');
  });
})

//Module angular
var app = angular.module('cart', ['ngMessages', 'ngRoute']);

//$rootScope
app.run(['$rootScope', function ($rootScope) {
  $rootScope.articleArray = [];
  $rootScope.totalPrice = 0;
  $rootScope.totalAmountProduct = 0;
  $rootScope.customerArray = [];
}]);

//Controller
app.controller('bdDataCtrl',['$scope', '$http', '$rootScope', '$filter', function($scope, $http, $rootScope, $filter) {
  //Chargement de la BDD Json
  $http.get('assets/json/bd-data.json')
  .then(function(response) {
    $scope.datas = response.data;
  });

  //Au click [+]
  $scope.moreProduct = function(idProduct) {
    //La variable correspond à la longueur du tableau
    var numberArray = $rootScope.articleArray.length;
    //Boucle pour chaque produit
    for(var i = 0; i < numberArray ; i++) {
      //Si dans la boucle on trouve un produit déja dans le panier alors
      if($rootScope.articleArray[i].id == idProduct) {
        //Produit + 1
        $rootScope.articleArray[i].amount++;
        //On multiplie le nombre de produit par le prix initial
        var newPrice = parseFloat($rootScope.articleArray[i].price) * parseFloat($rootScope.articleArray[i].amount);
        //On remplace la variable prix total du produit
        $rootScope.articleArray[i].total = newPrice.toFixed(2);
        //Modification du prix total
        $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat($rootScope.articleArray[i].price);
        //Produit total + 1
        $rootScope.totalAmountProduct++;
      }
    }
  }

  //Au click [-]
  $scope.lessProduct = function(idProduct) {
    //La variable correspond à la longueur du tableau
    var numberArray = $rootScope.articleArray.length;
    //Boucle pour chaque produit
    for(var i = 0; i < numberArray ; i++) {
      //Si dans la boucle on trouve un produit déja dans le panier alors
      if($rootScope.articleArray[i].id == idProduct) {
        //Produit -1
        $rootScope.articleArray[i].amount--;
        //On multiplie le nombre de produit par le prix initial
        var newPrice = parseFloat($rootScope.articleArray[i].price) * parseFloat($rootScope.articleArray[i].amount);
        //On remplace la variable prix total du produit
        $rootScope.articleArray[i].total = newPrice.toFixed(2);
        //Modification du prix total
        $rootScope.totalPrice = parseFloat($rootScope.totalPrice) - parseFloat($rootScope.articleArray[i].price);
        //Produit total - 1
        $rootScope.totalAmountProduct--;
        //Si produit = 0 alors
        if($rootScope.articleArray[i].amount == 0) {
          //On récupére l'index du produit
          var indexProduct = $rootScope.articleArray.indexOf($rootScope.articleArray[i]);
          //On donne à la variable indexDelete la valeur 1
          var indexDelete = 1;
        }
      }
    }
    //Si indexDelete == 1 alors
    if(indexDelete == 1) {
      //On supprime la ligne du produit via indexProduct
      $rootScope.articleArray.splice(indexProduct, 1);
    }
  }

  //Au click [Corbeille]
  $scope.deleteProduct = function(idProduct) {
    //La variable correspond à la longueur du tableau
    var numberArray = $rootScope.articleArray.length;
    //Boucle pour chaque produit
    for(var i = 0; i < numberArray ; i++) {
      //Si dans la boucle on trouve un produit déja dans le panier alors
      if($rootScope.articleArray[i].id == idProduct) {
        //On récupére l'index du produit
        var indexProduct = $rootScope.articleArray.indexOf($rootScope.articleArray[i]);
        //On donne à la variable indexDelete la valeur 1
        var indexDelete = 1;
      }
    }
    //Si indexDelete == 1 alors
    if(indexDelete == 1) {
      //Modification du prix total
      $rootScope.totalPrice = parseFloat($rootScope.totalPrice) - parseFloat($rootScope.articleArray[indexProduct].total);
      //Produit total = 0
      $rootScope.totalAmountProduct = parseInt($rootScope.totalAmountProduct) - parseInt($rootScope.articleArray[indexProduct].amount);
      //On supprime la ligne du produit via indexProduct
      $rootScope.articleArray.splice(indexProduct, 1);
    }
  }

  //Au click Delete customer [validater mon panier]
  $scope.deleteCustomer = function() {
    //On supprime le client
    $rootScope.articleArray.splice(0, 1);
  }

  //Au click [Commander]
  $scope.deleteCart = function() {
    //On enregistre dans un tableau les informtions du clients
    $rootScope.customerArray.push({
      lastname: $scope.lastName,
      name: $scope.name,
      adress: $scope.adress,
      postal: $scope.postalCode,
      city: $scope.city,
      mail: $scope.mail
    });

    //La variable correspond à la longueur du tableau
    var numberArray = $rootScope.articleArray.length;
    //On remet à 0 le prix total
    $rootScope.totalPrice = 0;
    //On remet à 0 le nombre de produit
    $rootScope.totalAmountProduct = 0;
    //On supprime tout le tableau articleArray
    $rootScope.articleArray.splice(0, numberArray);
  }

  //Au click [ajouter au panier]
  $scope.addCart = function(idProduct, titleProduct, priceProduct, pictureProduct, amountProduct, categoryProduct, refProduct, subtitleProduct, pictureProduct, altProduct) {

    //Fonction ajout produit
    var addProduct = function($rootScope) {
      //On enregistre dans un tableau les informations du produits
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
    //La variable correspond à la longueur du tableau
    var numberArray = $rootScope.articleArray.length;
    //Si le tableau est vide alors
    if(numberArray == 0) {
      //On applique la fonction addProduct
      addProduct(this);
      //On ajoute à la variable totalPrice le prix du produit
      $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat(this.data.price);
      //On augmente le total produit de 1
      $rootScope.totalAmountProduct++;
    //Sinon
    } else {
      //Boucle pour chaque produit
      for(var i = 0; i < numberArray ; i++) {
        //Si dans la boucle on trouve un produit déja dans le panier alors
        if($rootScope.articleArray[i].id == idProduct) {
          var existProduct = 1;
          //On ajoute le produit en augmentant de 1 sa quantité
          $rootScope.articleArray[i].amount++;
          //On multiplie le prix par le nombre de produit
          var newPrice = parseFloat($rootScope.articleArray[i].price) * parseFloat($rootScope.articleArray[i].amount);
          //On modifie le prix total du produit
          $rootScope.articleArray[i].total = newPrice.toFixed(2);
          //on modifie le motant total de la commande
          $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat($rootScope.articleArray[i].price);
          //On rajoute + au total produit
          $rootScope.totalAmountProduct++;
        }
      }
      //Si existProduct est différent de 1
      if (existProduct != 1) {
        //On applique la fonction addProduct
        addProduct(this);
        //on modifie le motant total de la commande
        $rootScope.totalPrice = parseFloat($rootScope.totalPrice) + parseFloat(this.data.price);
        //On rajoute + au total produit
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

  .when('/cart', {
    templateUrl : 'view/cart.html'
  })

  .when('/form', {
    templateUrl : 'view/form.html',
    controller : 'bdDataCtrl'
  })

  .when('/valid', {
    templateUrl : 'view/valid.html',
    controller : 'bdDataCtrl'
  })
});
