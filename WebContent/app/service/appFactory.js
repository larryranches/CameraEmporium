(function() {
    
	var appFactory = function($http) {
    
        var factory = {};
        
        factory.getProducts = function() {
            return $http.get('api/Products/GetProducts');
        };
        
        factory.getProduct = function(sku) {
            return $http.get('api/Products/GetProduct/' + sku);
        };
        
        factory.insertShippedOut = function(item) {
            $http({
                url: 'api/Products/InsertShippedOut/',
                contentType: "application/json",
                dataType: "JSON",
                method: 'POST',
                data: JSON.stringify(item)
            });
        };
        
        factory.updateOnHand = function(item) {
            $http({
                url: 'api/Products/UpdateOnHand/',
                contentType: "application/json",
                dataType: "JSON",
                method: 'POST',
                data: JSON.stringify(item)
            });
        };
        
        return factory;
    };
    
    appFactory.$inject = ['$http'];
        
    angular.module('app').factory('appFactory', appFactory);
                                           
}());