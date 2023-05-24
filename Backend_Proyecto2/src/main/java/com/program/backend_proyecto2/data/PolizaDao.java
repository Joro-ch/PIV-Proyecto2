package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.Cobertura;
import com.program.backend_proyecto2.logic.Poliza;
import com.program.backend_proyecto2.logic.Service;
import com.program.backend_proyecto2.logic.Vehiculo;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.sql.ResultSet;

public class PolizaDao {
    
    // ----------------------------------------------
    
    private DataBase db;
    
    public PolizaDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public List<Poliza> polizas(String cliente) throws Exception{
        Service service = Service.instance();
        String comando = "SELECT * FROM polizas where asegurado = ?";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, cliente);
        java.sql.ResultSet rs = db.executeQuery(stm);
        List<Poliza> polizas = new ArrayList<>();
        while (rs.next()) {
            String codigo = rs.getString("codigo");
            Double valorSeguro = rs.getDouble("valorSeguro");
            Vehiculo vehiculo = service.vehiculoFind(rs.getString("placaVehiculo"));
            String plazoPagos = rs.getString("plazoPagos");
            String fechaInicioVigencia = rs.getString("fechaInicioVigencia");
            List<Cobertura> coberturas = service.coberturasPoliza(codigo);
            Poliza polizaTemo = new Poliza(codigo,vehiculo,valorSeguro,plazoPagos,fechaInicioVigencia,coberturas);
            polizas.add(polizaTemo);
        }
        return polizas;
    }
    
    
    
    public void create(Poliza u) throws Exception {
        //El codigo es la cedula del asegurado+placa o sea 111999
        String comando = "Insert into polizas values(?,?,?,?,?,?)";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, u.getCodigo());
        stm.setString(2, u.getVehiculo().getIdPropietario());
        stm.setString(3, u.getVehiculo().getNumPlaca());
        stm.setString(4, Double.toString(u.getValorSeguro()));
        stm.setString(5, u.getPlazoPagos());
        stm.setString(6, u.getFechaInicioVigencia());


        db.executeUpdate(stm);

    }

    public Poliza read(String id) throws Exception {  
        String comando = "SELECT * FROM polizas p where p.codigo=?";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, id);
        java.sql.ResultSet rs = db.executeQuery(stm);
        if (rs.next()) {
            return from(rs, "p");
        }
        else {
            return null;
        }
    } 
    
    public void update(Poliza u) throws Exception {
        
    }
    
    public void delete(Poliza u) throws Exception {
    
    }
    
    public Poliza from(ResultSet rs, String alias) throws Exception {
        Service service = Service.instance();
        Poliza p = new Poliza();
        p.setCodigo(rs.getString(alias + ".codigo"));
        p.setValorSeguro(rs.getDouble(alias + ".valorSeguro"));
        p.setVehiculo((Vehiculo)service.vehiculoFind(rs.getString(alias + ".placaVehiculo")));
        p.setPlazoPagos(rs.getString(alias + ".plazoPagos"));
        p.setFechaInicioVigencia(rs.getString(alias + ".fechaInicioVigencia"));
        p.setCoberturas(service.coberturasPoliza(p.getCodigo()));
        return p;
    }

    public List<Poliza> polizasPlaca(String cliente, String placa) throws Exception{
        Service service = Service.instance();
        String comando = "SELECT * FROM polizas where asegurado = ? AND placaVehiculo = ?";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, cliente);
        stm.setString(2, placa);
        java.sql.ResultSet rs = db.executeQuery(stm);
        List<Poliza> polizas = new ArrayList<>();
        while (rs.next()) {
            String codigo = rs.getString("codigo");
            Double valorSeguro = rs.getDouble("valorSeguro");
            Vehiculo vehiculo = service.vehiculoFind(rs.getString("placaVehiculo"));
            String plazoPagos = rs.getString("plazoPagos");
            String fechaInicioVigencia = rs.getString("fechaInicioVigencia");
            List<Cobertura> coberturas = service.coberturasPoliza(codigo);
            Poliza polizaTemo = new Poliza(codigo,vehiculo,valorSeguro,plazoPagos,fechaInicioVigencia,coberturas);
            polizas.add(polizaTemo);
        }
        return polizas;
    }
}
