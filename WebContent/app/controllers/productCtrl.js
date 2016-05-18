(function() {

	var productCtrl = function($scope, $location, appFactory, cartFactory) {
		
		$scope.product = [];
		$scope.cart = cartFactory.getCart();
		$scope.qty;
		$scope.onHandQty;
		$scope.isInStock;
		$scope.itemAdded;
		$scope.validQty = true;
		$scope.showQtyError = false;
		
		// Init
		function init() {
			
			var sku = $location.search().sku;
			
			// Load Product			
			appFactory.getProduct(sku).success(function(product) {
				$scope.product = product;
				
				// get on hand qty
				if ($scope.product[0].on_hand_quantity > 0){
					$scope.isInStock = true;
					$scope.onHandQty = $scope.product[0].on_hand_quantity;
				} else {
					$scope.isInStock = false;
				};
				
				//console.log($scope.product[0].on_hand_quantity);
				//console.log($scope.product);
			}).error(function(data, status, headers, config) {
				$log.log(data.error + ' ' + status);
			});
			
			$scope.itemAdded = false;
		};

		init();
		
		// Functions
		$scope.addItem = function(){
			
			if($scope.qty > $scope.onHandQty){
				$scope.validQty = false;
				$scope.showQtyError = true;
				return;
			} else {
				$scope.validQty = true
				$scope.showQtyError = false;
			}
			
			if ($scope.qty > 0){
			
				var item = {
						"sku": $scope.product[0].sku, 
						"qty": $scope.qty, 
						"name": $scope.product[0].name, 
						"vendorModel": $scope.product[0].vendorModel,
						"retail": $scope.product[0].retail,
						"image": $scope.product[0].image,
						"on_hand_quantity": $scope.product[0].on_hand_quantity
				};
				
				console.log(item);
				cartFactory.addToCart(item);
				$scope.itemAdded = true;
				$scope.onHandQty = $scope.onHandQty - $scope.qty;
			} else {
				return;
			}
		}
		
		$scope.showCart = function(){
			delete $location.$$search.sku;
			$location.path('/cart');
		};
		
	};

	productCtrl.$inject = [ '$scope', '$location', 'appFactory', 'cartFactory' ];
	angular.module('app').controller('productCtrl', productCtrl);

}());
