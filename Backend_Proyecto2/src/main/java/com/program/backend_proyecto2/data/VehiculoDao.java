package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.Modelo;
import com.program.backend_proyecto2.logic.Usuario;
import com.program.backend_proyecto2.logic.Vehiculo;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class VehiculoDao {
        
    // ----------------------------------------------
    
    private DataBase db;
    
    public VehiculoDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(Vehiculo v) throws Exception {
        String comando = "insert into vehiculos (numPlaca, idPropietario, modelo, anio,valor) values (?,?,?,?,?)";
        System.out.println(v.getModelo().getModelo());
        System.out.println(v.getModelo().getAnio());
        System.out.println(v.getValor());
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, v.getNumPlaca());
        stm.setString(2, v.getIdPropietario());
        stm.setString(3, v.getModelo().getModelo());
        stm.setString(4, v.getModelo().getAnio());
        stm.setString(5,Double.toString(v.getValor()));
        
        db.executeUpdate(stm);
    }

    public Vehiculo read(String numPlaca) throws Exception {
        
        String comando = "SELECT v.*, m.modelo, m.anio, m.marca, m.imagen FROM vehiculos v "
            + "INNER JOIN modelos m ON v.modelo = m.modelo AND v.anio = m.anio "
            + "WHERE v.numPlaca = ?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, numPlaca);
        
        ResultSet rs = db.executeQuery(stm);
        
        if (rs.next()) {
            Vehiculo v = new Vehiculo();
            v.setAnio(rs.getString( "v.anio"));
            v.setIdPropietario(rs.getString( "v.idPropietario"));
            v.setNumPlaca(rs.getString( "v.numPlaca"));
            v.setValor(Double.parseDouble(rs.getString( "v.valor")));
            Modelo m = new Modelo();
            m.setAnio(v.getAnio());
            m.setModelo(rs.getString( "m.modelo"));
            m.setMarca(rs.getString( "m.marca"));
            m.setImagen(rs.getBytes("m.imagen"));
            v.setModelo(m);
            return v;
        }
        else {
            return null;
        }
    } 
    
    public void update(Vehiculo v) throws Exception {
        String comando = "update vehiculos set idPropietario=?, modelo=?, anio=? where numPlaca=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
      
        stm.setString(1, v.getIdPropietario());
        stm.setString(2, v.getModelo().getModelo());
        stm.setString(3, v.getModelo().getAnio());
        stm.setString(4, v.getNumPlaca());
        
        int count = db.executeUpdate(stm);
        
        if (count == 0) {
            throw new Exception("VEHICULO NO ENCONTRADO");
        } 
    }
    
    public void delete(Vehiculo v) throws Exception {
        String comando = "delete from vehiculos where numPlaca=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, v.getNumPlaca());
        
        int count = db.executeUpdate(stm);
        
        if(count == 0) {
            throw new Exception("VEHICULO NO ENCONTRADO");
        }
    }
    
    public Vehiculo from(ResultSet rs, String alias) throws Exception {
        Vehiculo v = new Vehiculo();
        Modelo modelo = new Modelo();
        modelo.setModelo(rs.getString(alias + ".modelo"));
        modelo.setAnio(rs.getString(alias + ".anio"));
        v.setNumPlaca(rs.getString(alias + ".numPlaca"));
        v.setValor(Double.parseDouble(rs.getString(alias + ".valor")));
        v.setIdPropietario(rs.getString(alias + ".idPropietario"));
        v.setModelo(modelo);
        return v;
    }
}
