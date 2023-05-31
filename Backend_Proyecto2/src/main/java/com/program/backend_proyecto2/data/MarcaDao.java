package com.program.backend_proyecto2.data;


import com.program.backend_proyecto2.data.DataBase;
import com.program.backend_proyecto2.logic.Marca;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author gorki
 */
public class MarcaDao {
     // ----------------------------------------------
    
    private DataBase db;
    
    public MarcaDao(DataBase db) {
        this.db = db;
    }
    
    // Métodos
    
    public void create(Marca m) throws Exception {
        String comando = "insert into marcas(marca) values(?)";
        PreparedStatement stm = db.prepareStatement(comando);
        stm.setString(1, m.getMarca());
        db.executeUpdate(stm);
    }
    
}
