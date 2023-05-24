package com.program.backend_proyecto2.logic;

import java.util.ArrayList;
import java.util.List;

public class Categoria {
    
    // Atributos
    
    private String id;
    private String descripcion;
    private List<Cobertura> coberturas;
    
    // Métodos

    public Categoria() {
        this.id = "";
        this.descripcion = "";
        this.coberturas = new ArrayList<>();
    }
    
    public Categoria(String id, String descripcion) {
        this.id = id;
        this.descripcion = descripcion;
        this.coberturas = new ArrayList<>();
    }

    public Categoria(String id, String descripcion, List<Cobertura> coberturas) {
        this.id = id;
        this.descripcion = descripcion;
        this.coberturas = coberturas;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Cobertura> getCoberturas() {
        return coberturas;
    }

    public void setCoberturas(List<Cobertura> coberturas) {
        this.coberturas = coberturas;
    }
    
    // Métodos Específicos
    
    public void addCobertura(Cobertura cobertura) {
        cobertura.setId(this.id + String.valueOf(coberturas.size() + 1));
        cobertura.setCategoria(Integer.valueOf(this.id));
        coberturas.add(cobertura);
    }
    
}
