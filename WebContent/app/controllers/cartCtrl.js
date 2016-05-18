(function() {

	var cartCtrl = function($scope, $location, cartFactory) {
		
		// Variables
		$scope.cart = cartFactory.getCart();
		$scope.cartList = [];
		$scope.taxTotal = 0;
		
		// init
		function init() {
			
			if(!$scope.isCartEmpty()){
				$scope.cartList = cartFactory.getCart();
				console.log("Cart: " + JSON.stringify($scope.cartList))
			}
			
			$scope.cartList = cartFactory.getCart();
			console.log("Cart: " + JSON.stringify($scope.cartList))
		};
		
		
		// Functions
		$scope.isCartEmpty = function(){
			
			if ($scope.cart.length < 1){
				return true;
			} else {
				return false;
			}
			
		};
		
		$scope.sendHome = function(){
			$location.path('/');
		};
		
		$scope.deleteItem = function(cartList, index){
			cartFactory.deleteItem(cartList, index);
			//console.log("After Delete: " + JSON.stringify($scope.cartList));
		}
		
		$scope.getTotal = function(qty, retail){
			return totalPrice = qty * retail;
		}
		
		$scope.totalAmount = function(){
			
			var calculatedRowTotals = [];
			var totalAmount = 0;
			
			// Calculate Amount Per Row Item
			for(i = 0; i < $scope.cart.length; i++){
				calculatedRowTotals.push($scope.cart[i].qty * $scope.cart[i].retail);
			}
			
			// Calculate all rows
			for(var key in calculatedRowTotals){
				totalAmount += $scope.cart[key].qty * $scope.cart[key].retail;
			}
			
			// Add Shipping and Tax
			var tax = totalAmount * 0.08;
			$scope.taxTotal = tax;
			
			totalAmount += $scope.taxTotal;
			totalAmount += 5;
			
			// Send total amount to cart factory
			cartFactory.sendTotal(totalAmount);
			
			return totalAmount.toFixed(2);
			
		}
		
		$scope.checkoutNow = function(){
			$location.path('/checkout');
		};
		
		init();
	};

	cartCtrl.$inject = ['$scope', '$location', 'cartFactory'];
	angular.module('app').controller('cartCtrl', cartCtrl);

}());
