(function() {
    
	var cartFactory = function($http) {
    
        var cart = {};
        cart.cartItems = [];
        cart.total = 0;
        
        cart.addToCart = function(items) {
            cart.cartItems.push(items);
        };
        
        cart.getCart = function() {
            return cart.cartItems;
        };
        
        cart.deleteItem = function(cartList, index) {
        	cart.cartItems = cartList;
        	cart.cartItems.splice(index, 1);
        };
        
        cart.sendTotal = function(total){
        	cart.total = total;
        };
        
        cart.emptyCart = function(){
        	cart.cartItems = [];
        };
        
        return cart;
    };
    
    cartFactory.$inject = ['$http'];
        
    angular.module('app').factory('cartFactory', cartFactory);
                                           
}());