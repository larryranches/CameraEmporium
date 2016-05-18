package proj3.api;

import javax.ws.rs.*;
import java.sql.*;
import proj3.dao.*;

// This API connects to opatija/Jadrn030 database and returns the Date Time to test connection
@Path("/getDbStatus")
public class DbStatus extends DbConn {
	
	@GET
	@Produces("text/html")
	public String getDbStatus() throws Exception {
		
		PreparedStatement query = null;
		String dateString = null;
		String returnString = null;
		Connection conn = null;
		
		try {
			
			conn = mySqlJadrn030Connection();
			query = conn.prepareStatement("select sysdate() 'DATETIME'");			
			ResultSet rs = query.executeQuery();

			while (rs.next()) {
				
				dateString = rs.getString("DATETIME");
			}
			
			query.close();
			
			returnString = "<p>Database Status</p> " +
					"<p>Database Date/Time return: " + dateString + "<p>";				
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if ( conn != null)
				conn.close();
		}
		
		return returnString;
		
	}
	
}
