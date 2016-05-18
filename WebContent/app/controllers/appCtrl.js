(function() {

	var appCtrl = function($scope, $location, appFactory, cartFactory) {
		// Variables
		$scope.products = [];
		$scope.cart = cartFactory.getCart();
		$scope.searchQuery = {};
		$scope.queryBy = '$'
		
		
		// Init
		function init() {
			
			// Load Products			
			appFactory.getProducts().success(function(products) {
				$scope.products = products;
				console.log($scope.products);
			}).error(function(data, status, headers, config) {
				$log.log(data.error + ' ' + status);
			});

		}

		
		// Call Functions
		init();
		
		// Functions
		$scope.showCart = function(){
			$location.path('/cart');
		};
	};

	appCtrl.$inject = [ '$scope', '$location', 'appFactory', 'cartFactory' ];
	angular.module('app').controller('appCtrl', appCtrl);

}());
