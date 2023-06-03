package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.MetodoPago;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class MetodoPagoDao {
    
    // ----------------------------------------------
    
    private DataBase db;
    
    public MetodoPagoDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(MetodoPago m) throws Exception {
        String comando = "insert into metodosDePago (idTitular,titular,numTarjeta, fechaExp, codigoSeguridad) values (?,?,?,?,?)";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, m.getId_Titular());  
        stm.setString(2, m.getTitular());
        stm.setString(3, m.getNumTarjeta());
        stm.setString(4, m.getFechaExp());
        stm.setString(5, m.getCodigoSeguridad());
        
        db.executeUpdate(stm);
    }

    public MetodoPago read(String codigo) throws Exception {
        String comando = "select * from metodosDePago m where m.idTitular=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, codigo);
        
        ResultSet rs = db.executeQuery(stm);
        
        if (rs.next()) {
            return from(rs, "m");
        }
        else {
            return null;
        }
    } 
    
    public void update(MetodoPago m) throws Exception {
        String comando = "update metodosDePago set titular=?, fechaExp=?,"
                + "codigoSeguridad=?, numTarjeta=? where idTitular = ?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, m.getTitular());
        stm.setString(2, m.getFechaExp());
        stm.setString(3, m.getCodigoSeguridad());
        stm.setString(4, m.getNumTarjeta());
        stm.setString(5, m.getId_Titular());
        
        int count = db.executeUpdate(stm);
        
        if (count == 0) {
            throw new Exception("TARJETA NO ENCONTRADA");
        } 
    }
    
    public void delete(MetodoPago m) throws Exception {
        String comando = "delete from metodosDePago where idTitular=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, m.getNumTarjeta());
        
        int count = db.executeUpdate(stm);
        
        if(count == 0) {
            throw new Exception("TARJETA NO ENCONTRADO");
        }
    }
    
    public MetodoPago from(ResultSet rs, String alias) throws Exception {
        MetodoPago m = new MetodoPago();
        
        m.setId_Titular(rs.getString(alias + ".idTitular"));
        m.setTitular(rs.getString(alias + ".titular"));
        m.setNumTarjeta(rs.getString(alias + ".numTarjeta"));
        m.setFechaExp(rs.getString(alias + ".fechaExp"));
        m.setCodigoSeguridad(rs.getString(alias + ".codigoSeguridad"));
        
        return m;
    }
}
