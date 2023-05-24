package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.Cobertura;
import com.program.backend_proyecto2.logic.Service;
import jakarta.resource.cci.ResultSet;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

public class CoberturasPolizasDao {
    
    // ----------------------------------------------
    
    private DataBase db;
    
    public CoberturasPolizasDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(String cId, String pId) throws Exception {
          String comando = "insert into coberturasPolizas (codigoPoliza,idCobertura) values (?,?)";
          PreparedStatement stm = db.prepareStatement(comando);
          stm.setString(1, pId);
          stm.setString(2, cId);
        
        
          db.executeUpdate(stm);
    }

    public Cobertura read(String id) throws Exception {
        return new Cobertura();
    } 
    
    public void update(Cobertura u) throws Exception {
        
    }
    
    public void delete(Cobertura u) throws Exception {
    
    }
    
    public List<Cobertura> coberturasPoliza(String codigoP) throws Exception{
        Service service = Service.instance();
        String comando = "select * FROM coberturas c JOIN coberturasPolizas cp ON cp.idCobertura = c.id where cp.codigoPoliza = ?";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, codigoP);
        java.sql.ResultSet rs = stm.executeQuery();
        List<Cobertura> coberturas = new ArrayList<>();
        while(rs.next()){
            coberturas.add(service.coberturaFrom(rs, "c"));
        }
        return coberturas; 
    }
}
