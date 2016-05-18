(function(){
	
	$.ajax

	
	// BELOW ARE AJAX CALLS TO DATABASE
	function GetProducts() {
		$('#receivedProd').empty();
		var url = '../api/Products/GetProducts';
		$.ajax({
			url : url,
			type : 'GET',
			dataType : "JSON",
			success : function(data) {
				
				var jsonObj = JSON.strin
				$('#productsMenu').append(result);
			}
		});
		
	}
}());
