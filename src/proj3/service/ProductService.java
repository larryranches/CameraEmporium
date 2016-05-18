package proj3.service;

import java.sql.*;

import org.codehaus.jettison.json.JSONArray;

import proj3.dao.DbConn;
import proj3.utils.ToJson;

import java.util.Date;

public class ProductService extends DbConn {
	
	public JSONArray GetProducts() throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJson jsonConverter = new ToJson();
		JSONArray json = new JSONArray();
		
		try {
			
			conn = mySqlJadrn030Connection();
			query = conn.prepareStatement("SELECT * "
					+ "FROM jadrn030.product AS p "
					+ "JOIN jadrn030.vendor AS v ON p.venID = v.vendorID "
					+ "JOIN jadrn030.category AS c ON c.categoryID = p.catID "
					+ "LEFT OUTER JOIN jadrn030.on_hand AS o ON o.sku = p.sku "
					+ "ORDER BY v.name;");
			ResultSet rSet = query.executeQuery();
			json = jsonConverter.toJSONArray(rSet);
			query.close();
		} 
		catch (SQLException sqlErr){
			sqlErr.printStackTrace();
		} 
		catch (Exception e) {
			e.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		
		return json;
	}
	
	public JSONArray GetProduct(String sku) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJson jsonConverter = new ToJson();
		JSONArray json = new JSONArray();
		
		try {
			
			conn = mySqlJadrn030Connection();
			query = conn.prepareStatement("SELECT * "
					+ "FROM jadrn030.product AS p "
					+ "JOIN jadrn030.vendor AS v ON p.venID = v.vendorID "
					+ "JOIN jadrn030.category AS c ON c.categoryID = p.catID "	
					+ "LEFT OUTER JOIN jadrn030.on_hand AS o ON o.sku = p.sku "
					+ "WHERE p.sku=\"" + sku + "\";");
			ResultSet rSet = query.executeQuery();
			json = jsonConverter.toJSONArray(rSet);
			query.close();
		} 
		catch (SQLException sqlErr){
			sqlErr.printStackTrace();
		} 
		catch (Exception e) {
			e.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		
		return json;
	}
	
	public int insertShippedOut(String sku, String qty) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;

		try {
			conn = mySqlJadrn030Connection();
			query = conn
					.prepareStatement("INSERT into merchandise_out "
							+ "(sku, date, qty) "
							+ "VALUES ( ?, ?, ?) ");

			query.setString(1, sku);
			java.util.Date dt = new java.util.Date();
			java.text.SimpleDateFormat sdf = 
				     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currentTime = sdf.format(dt);
			query.setString(2, currentTime);
			int qtyParsed = Integer.parseInt(qty);
			query.setInt(3, qtyParsed);

			query.executeUpdate(); // note the new command for insert statement

		} catch (Exception e) {
			e.printStackTrace();
			return 500; // if a error occurs, return a 500
		} finally {
			if (conn != null)
				conn.close();
		}

		return 200;
	}
	
	public int updateOnHand(String sku, String on_hand_quantity) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;

		try {
			conn = mySqlJadrn030Connection();
			query = conn
					.prepareStatement("UPDATE on_hand "
							+ "SET last_date_modified = ?, on_hand_quantity = ? "
							+ "WHERE sku = ? ");

			query.setString(3, sku);
			java.util.Date dt = new java.util.Date();
			java.text.SimpleDateFormat sdf = 
				     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currentTime = sdf.format(dt);
			query.setString(1, currentTime);
			int qtyParsed = Integer.parseInt(on_hand_quantity);
			query.setInt(2, qtyParsed);

			query.executeUpdate(); // note the new command for insert statement

		} catch (Exception e) {
			e.printStackTrace();
			return 500; // if a error occurs, return a 500
		} finally {
			if (conn != null)
				conn.close();
		}

		return 200;
	}
	
}


