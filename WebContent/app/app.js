(function() {

	var app = angular.module("app", [ "ngRoute" ]);

	app.config([ '$routeProvider', function($routeProvider) {

		$routeProvider.when('/', {
			templateUrl : 'app/views/app.html',
			controller : 'appCtrl'
		}).when('/cart', {
			templateUrl : 'app/views/cart.html',
			controller : 'cartCtrl'
		}).when('/product', {
			templateUrl : 'app/views/product.html',
			controller : 'productCtrl'
		}).when('/checkout', {
			templateUrl : 'app/views/checkout.html',
			controller : 'checkoutCtrl'
		});
	}]);

	return app;

}());
