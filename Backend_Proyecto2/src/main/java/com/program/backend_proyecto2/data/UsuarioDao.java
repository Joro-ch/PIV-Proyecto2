package com.program.backend_proyecto2.data;

import com.program.backend_proyecto2.logic.Usuario;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UsuarioDao {
    
    // ----------------------------------------------
    
    private DataBase db;
    
    public UsuarioDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(Usuario u) throws Exception {
        String comando = "insert into usuarios (id, clave, tipo) values (?,?,?)";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, u.getId());
        stm.setString(2, u.getClave());
        stm.setInt(3, u.getTipo());
        
        db.executeUpdate(stm);
    }

    public Usuario read(String id) throws Exception {
        String comando = "select * from usuarios u where u.id=?";
        
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, id);
        
        ResultSet rs = db.executeQuery(stm);
        
        if (rs.next()) {
            return from(rs, "u");
        }
        else {
            return null;
        }
    } 
    
    public void update(Usuario u) throws Exception {
        String comando = "update usuarios set clave=? where id=?";
        
        String clave = u.getClave();
        String id = u.getId();
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, clave);
        stm.setString(2, id);
        
        int count = db.executeUpdate(stm);
        
        if (count == 0) {
            throw new Exception("USUARIO NO ENCONTRADO");
        } 
    }
    
    public void delete(Usuario u) throws Exception {
        String comando = "delete from usuarios where id=?";
        
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, u.getId());
        
        int count = db.executeUpdate(stm);
        
        if(count == 0) {
            throw new Exception("USUARIO NO ENCONTRADO");
        }
    }
    
    public Usuario from(ResultSet rs, String alias) throws Exception {
        Usuario u = new Usuario();
        
        u.setId(rs.getString(alias + ".id"));
        u.setClave(rs.getString(alias + ".clave"));
        u.setTipo(rs.getInt(alias + ".tipo"));
        
        return u;
    }
    
}
