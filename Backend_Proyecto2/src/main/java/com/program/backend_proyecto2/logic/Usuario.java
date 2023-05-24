package com.program.backend_proyecto2.logic;

public class Usuario {
    
    // Atributos
    
    private String id;
    private String clave;
    private Integer tipo;
    
    //  Métodos

     public Usuario() {
        this.id = "";
        this.clave = "";
        this.tipo = 0;
    }

    public Usuario(String id, String clave, Integer tipo) {
        this.id = id;
        this.clave = clave;
        this.tipo = tipo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public Integer getTipo() {
        return tipo;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }

    public boolean equal(Object object) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
