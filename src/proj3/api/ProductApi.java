package proj3.api;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import proj3.service.ProductService;

@Path("/Products")
public class ProductApi {
	
	@Path("/GetProducts")
	@GET
	@Produces("application/json")
	public Response getProducts() throws Exception{
		
		String data = null;
		JSONArray json = new JSONArray();
		
		try {
			ProductService _productService = new ProductService();
			json = _productService.GetProducts();
			data = json.toString();
		} 
		catch (Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server wasn't able to process your request").build();
		}
		
		return Response.ok(data).build();
	}
	
	@Path("/GetProduct/{param}")
	@GET
	@Produces("application/json")
	public Response GetProduct(@PathParam("param") String sku) throws Exception{
		
		String data = null;
		JSONArray json = new JSONArray();
		
		try {
			ProductService _productService = new ProductService();
			json = _productService.GetProduct(sku);
			data = json.toString();
		} 
		catch (Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server wasn't able to process your request").build();
		}
		
		return Response.ok(data).build();
	}
	
	@POST
	@Path("/InsertShippedOut/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addShippedOut(String incomingData) throws Exception {
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		ProductService _productService = new ProductService();
		
		try {
			
			JSONObject shippedOutData = new JSONObject(incomingData);
			System.out.println( "jsonData: " + shippedOutData.toString() );
			

			int http_code = _productService.insertShippedOut(shippedOutData.optString("sku"), shippedOutData.optString("qty")); 
			
			if( http_code == 200 ) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item has been entered successfully");

				returnString = jsonArray.put(shippedOutData).toString();
			} else {
				return Response.status(500).entity("Unable to enter Item").build();
			}
			
			System.out.println( "returnString: " + returnString );
			
		} catch(Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		
		return Response.ok(returnString).build();
	}

	@POST
	@Path("/UpdateOnHand/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addOnHand(String incomingData) throws Exception {
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		ProductService _productService = new ProductService();
		
		try {
			
			JSONObject onHandData = new JSONObject(incomingData);
			System.out.println( "jsonData: " + onHandData.toString() );
			

			int http_code = _productService.updateOnHand(onHandData.optString("sku"), onHandData.optString("on_hand_quantity")); 
			
			if( http_code == 200 ) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item has been entered successfully");

				returnString = jsonArray.put(onHandData).toString();
			} else {
				return Response.status(500).entity("Unable to enter Item").build();
			}
			
			System.out.println( "returnString: " + returnString );
			
		} catch(Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		
		return Response.ok(returnString).build();
	}
}
