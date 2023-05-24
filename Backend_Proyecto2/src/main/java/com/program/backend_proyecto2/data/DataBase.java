package com.program.backend_proyecto2.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

public class DataBase {
    
    Connection cnx;
    
    public DataBase() {
        cnx = this.getConnection();            
    }
    
    public Connection getConnection(){
        try {
            String driver = "com.mysql.cj.jdbc.Driver";
            String server = "localhost";
            String port = "3306";
            String user = "root";
            String password = "root";
            String database = "pageDB";
            
            String URL_conexion="jdbc:mysql://"+ server+":"+port+"/"+database+"?user="+user+"&password="+
                    password+"&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
            Class.forName(driver).newInstance();
            return DriverManager.getConnection(URL_conexion);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            System.exit(-1);
        } 
        return null;
    }
    
    // Métodos Específicos
    // ----------------------------------------------------------------------------

    public PreparedStatement prepareStatement(String statement) throws Exception {
        try {
            return cnx.prepareStatement(statement);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new Exception("ERROR DE BASE DE DATOS");
        }
    }

    public int executeUpdate(PreparedStatement statement) throws Exception {
        try {
            statement.executeUpdate();
            return statement.getUpdateCount();
        } catch (SQLIntegrityConstraintViolationException ex) {
            throw ex;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            throw new Exception("ERROR DE BASE DE DATOS");
        }

    }

    public ResultSet executeQuery(PreparedStatement statement) throws Exception {
        try {
            return statement.executeQuery();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new Exception("ERROR DE BASE DE DATOS");
        }
    }
    
}