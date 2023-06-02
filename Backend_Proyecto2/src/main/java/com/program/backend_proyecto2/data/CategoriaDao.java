package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.Categoria;
import com.program.backend_proyecto2.logic.Cliente;
import com.program.backend_proyecto2.logic.Cobertura;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CategoriaDao {
    
    // ----------------------------------------------
    
    private DataBase db;
    
    public CategoriaDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(Categoria c) throws Exception {
        String comando = "insert into categorias (descripcion) values (?)";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, c.getDescripcion());
        
        db.executeUpdate(stm);
    }

    public Categoria read(String id) throws Exception {
        String comando = "select * from categorias c where c.id=?";
        
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
    
    public void update(Categoria c) throws Exception {
        String comando = "update clientes set descripcion=? where id=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        
        stm.setString(1, c.getDescripcion());
        stm.setString(2, c.getId());
        
        int count = db.executeUpdate(stm);
        
        if (count == 0) {
            throw new Exception("CATEGORIA NO ENCONTRADO");
        } 
    }
    
    public void delete(Categoria c) throws Exception {
        String comando = "delete from categorias where id=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, c.getId());
        
        int count = db.executeUpdate(stm);
        
        if(count == 0) {
            throw new Exception("CATEGORIA NO ENCONTRADO");
        }
    }
    
    public List<Categoria> categorias() throws Exception {
        String comando = "select * from categorias";
        
        PreparedStatement stm = db.prepareStatement(comando);
        
        ResultSet rs = stm.executeQuery();
        List<Categoria> categorias = new ArrayList<>();
        
        while(rs.next()){
            String id = rs.getString("id");
            String descripcion = rs.getString("descripcion");
            Categoria categoriaTemp = new Categoria(id, descripcion);
            categorias.add(categoriaTemp);
        }
        
        agregarCoberturas(categorias);
        
        return categorias; 
    }
    
    public boolean estaCategoria(String descripcion) throws Exception {
        String comando = "select * from categorias c where c.descripcion=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, descripcion);
        
        ResultSet rs = db.executeQuery(stm);
        
        return rs.next();
    }
    
    public Categoria from(ResultSet rs, String alias) throws Exception {
        Categoria c = new Categoria();
        
        c.setId(rs.getString(alias + ".id"));
        c.setDescripcion(rs.getString(alias + ".descripcion"));
        
        return c;
    }

    public void agregarCoberturas(List<Categoria> categ) throws Exception {
        CoberturaDao cobDao = new CoberturaDao(db);
        List<Categoria> categorias = categ;
        List<Cobertura> coberturas = cobDao.coberturas();
            
        for(Categoria cat:categorias) {
            for(Cobertura cob:coberturas) {
                if(cob.getCategoria().equals(Integer.valueOf(cat.getId()))) {
                    cat.addCobertura(cob);
                }
            }
        }
    }
}
