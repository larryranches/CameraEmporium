(function() {

	var checkoutCtrl = function($scope, $location, cartFactory, appFactory) {
		
		$scope.isChecked = false;
		$scope.ship = {};
		$scope.bill = {};
		$scope.cart = cartFactory.getCart();
		$scope.cartList = [];
		$scope.total = cartFactory.total.toFixed(2);
		$scope.showConfirmation = false;
		
		// init
		function init() {
			
			if(!$scope.isCartEmpty()){
				$scope.cartList = cartFactory.getCart();
			} else if ($scope.showConfirmation) {
				return;
			} else {
				$location.path('/');
			}
			
			$scope.cartList = cartFactory.getCart();
		};
		
		
		$scope.isSame = function(){
			
			if ($scope.isChecked){
				
				// Copy from Shipping
				$scope.bill = {
						name: $scope.ship.name,
						add: $scope.ship.add,
						add2: $scope.ship.add2,
						city: $scope.ship.city,
						state: $scope.ship.state,
						zip: $scope.ship.zip,
						phone: $scope.ship.phone
					};

			} else {
				return;
			}
		};
		
		$scope.isCartEmpty = function(){
			
			if ($scope.cart.length < 1){
				return true;
			} else {
				return false;
			}
			
		};
		
		$scope.cancel = function(){
			cartFactory.emptyCart();
			$location.path('/')
		};
		
		$scope.submitOrder = function(){
			
			// Add to Merchandise shipped
			for(var i in $scope.cartList){
				
				var item = {
						"sku": $scope.cartList[i].sku,
						"qty": $scope.cartList[i].qty
					}
				
				appFactory.insertShippedOut(item)
				console.log(item);
			};
			
			// Update On Hand table
			for(var i in $scope.cartList){
				
				var updatedQty = $scope.cartList[i].on_hand_quantity - $scope.cartList[i].qty;
				console.log(updatedQty);
				
				var item = {
						"sku": $scope.cartList[i].sku,
						"on_hand_quantity": updatedQty
					}
				
				appFactory.updateOnHand(item);
				console.log(item);
			};
			
			cartFactory.emptyCart();
			$scope.showConfirm = true;
		};
		
		$scope.goHome = function(){
			$location.path('/');
		};
		
		init();
	};

	checkoutCtrl.$inject = ['$scope', '$location', 'cartFactory', 'appFactory'];
	angular.module('app').controller('checkoutCtrl', checkoutCtrl);

}());
