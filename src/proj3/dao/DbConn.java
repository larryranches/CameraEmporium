package proj3.dao;

import java.sql.Connection;

import javax.naming.*;
import javax.sql.*;

// Creates DATABASE connection to Jadrn030 via META_INF/context.xml file

public class DbConn {

	private static DataSource ds = null;
	private static Context context = null;
	
	private static DataSource MySqlJadrn030Ds() throws Exception
	{
		// Use existing data connection if in use
		if (ds != null)
		{
			return ds;
		}
		
		try 
		{
			if (context == null) 
			{
				context = new InitialContext();
			}
			
			ds = (DataSource) context.lookup("java:comp/env/jdbc/jadrn030");
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return ds;
	}
	
	protected static Connection mySqlJadrn030Connection(){
		
		Connection conn = null;
		
		try {
			conn = MySqlJadrn030Ds().getConnection();
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return conn;
		
	}
	
}
