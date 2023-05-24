package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.MetodoPago;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import com.program.backend_proyecto2.logic.Modelo;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ModeloDao {
        
    // ----------------------------------------------
    
    private DataBase db;
    
    public ModeloDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(Modelo m) throws Exception {
        System.out.println("modelo dao");
        String comando = "insert into modelos(modelo,anio,marca,imagen) values (?,?,?,?)";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, m.getModelo());
        stm.setString(2, m.getAnio());
        stm.setString(3, m.getMarca());
        InputStream imageStream = new ByteArrayInputStream(m.getImagen());
        stm.setBinaryStream(4, imageStream, m.getImagen().length);
    
        db.executeUpdate(stm);
    }

    public Modelo read(String modelo, String anio) throws Exception {
        String comando = "select * from modelos m where m.modelo=? and anio=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, modelo);
        stm.setString(2,anio);
        
        ResultSet rs = db.executeQuery(stm);
        
        if (rs.next()) {
            return from(rs, "m");
        }
        else {
            return null;
        }
    } 
    
    public List<Modelo> modelos() throws Exception{
        String comando = "select * from modelos";
        PreparedStatement stm = db.prepareStatement(comando);
        java.sql.ResultSet rs = stm.executeQuery();
        List<Modelo> modelos = new ArrayList<>();
        while(rs.next()){
            String modelo = rs.getString("modelo");
            String anio = rs.getString("anio");
            String marca = rs.getString("marca");
            byte[] imagenBytes = rs.getBytes("imagen");
            Modelo modeloTemp = new Modelo(modelo, anio, marca, imagenBytes);
            modelos.add(modeloTemp);
        }
        return modelos; 
    }
    
    
    
    public List<String> marcas() throws Exception{
        String comando = "select * from marcas";
        PreparedStatement stm = db.prepareStatement(comando);
        java.sql.ResultSet rs = stm.executeQuery();
        List<String> marcas = new ArrayList<>();
        while(rs.next()){
            String marca = rs.getString("marca");
            System.out.println(marca);
            marcas.add(marca);
        }
        return marcas; 
    }
    
    public void update(String u) throws Exception {
        
    }
    
    public void delete(String u) throws Exception {
    
    }
    
    public Modelo from(ResultSet rs, String alias) throws Exception {
        Modelo m = new Modelo();
        m.setModelo(rs.getString(alias + ".modelo"));
        m.setAnio(rs.getString(alias + ".anio"));
        m.setMarca(rs.getString(alias + ".marca"));
        m.setImagen(rs.getBytes(alias + ".imagen"));
        System.out.println("Entra al from modelo");
        return m;
    }
}
