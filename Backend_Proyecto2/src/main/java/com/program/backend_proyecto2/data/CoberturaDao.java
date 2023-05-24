package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.Cobertura;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CoberturaDao {
    
    // ----------------------------------------------
    
    private DataBase db;
    
    public CoberturaDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(Cobertura c) throws Exception {
        String comando = "insert into coberturas (descripcion, costoMinimo, costoPorcentual, categoria) values (?,?,?,?)";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, c.getDescripcion());
        stm.setInt(2, c.getCostoMinimo());
        stm.setInt(3, c.getCostoPorcentual());
        stm.setInt(4, c.getCategoria());
        
        db.executeUpdate(stm);
    }

    public Cobertura read(String id) throws Exception {
       String comando = "select * from coberturas c where c.id=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, id);
        
        ResultSet rs = db.executeQuery(stm);
        
        if (rs.next()) {
            return from(rs, "c");
        }
        else {
            return null;
        }
    } 
    
    public void update(Cobertura c) throws Exception {
        String comando = "update coberturas set descripcion=? costoMinimo=? costoPorcentual=? categoria=? where id=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, c.getDescripcion());
        stm.setInt(2, c.getCostoMinimo());
        stm.setInt(3, c.getCostoPorcentual());
        stm.setInt(4, c.getCategoria());
        stm.setString(5, c.getId());
        
        int count = db.executeUpdate(stm);
        
        if (count == 0) {
            throw new Exception("COBERTURA NO ENCONTRADA");
        } 
    }
    
    public void delete(Cobertura c) throws Exception {
        String comando = "delete from coberturas where id=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, c.getId());
        
        int count = db.executeUpdate(stm);
        
        if(count == 0) {
            throw new Exception("COBERTURA NO ENCONTRADA");
        }
    }
    
    public List<Cobertura> coberturas() throws Exception {
        String comando = "select * from coberturas c";
        
        PreparedStatement stm = db.prepareStatement(comando);
        
        ResultSet rs = stm.executeQuery();
        List<Cobertura> coberturas = new ArrayList<>();
        
        while(rs.next()){
            coberturas.add(from(rs,"c"));
        }
        return coberturas; 
    }
    
    public boolean estaCobertura(String descripcion) throws Exception {
        String comando = "select * from coberturas c where c.descripcion=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, descripcion);
        
        ResultSet rs = db.executeQuery(stm);
        
        return rs.next();
    }
    
    public Cobertura from(ResultSet rs, String alias) throws Exception {
        Cobertura c = new Cobertura();
        
        c.setId(rs.getString(alias + ".id"));
        c.setDescripcion(rs.getString(alias + ".descripcion"));
        c.setCostoMinimo(rs.getInt(alias + ".costoMinimo"));
        c.setCostoPorcentual(rs.getInt(alias + ".costoPorcentual"));
        c.setCategoria(rs.getInt(alias + ".categoria"));
        
        return c;
    }
}
