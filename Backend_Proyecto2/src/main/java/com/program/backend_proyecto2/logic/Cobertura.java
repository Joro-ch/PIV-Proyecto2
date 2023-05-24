package com.program.backend_proyecto2.logic;

public class Cobertura {
    
    // Atributos
    
    private String id;
    private String descripcion;
    private Integer costoMinimo;
    private Integer costoPorcentual;
    private Integer categoria;
    
    // Métodos

    public Cobertura() {
        this.id = "";
        this.descripcion = "";
        this.costoMinimo = 0;
        this.costoPorcentual = 0;
        this.categoria = 0;
    }
    
    public Cobertura(String descripcion, Integer costoMinimo, Integer costoPorcentual) {
        this.id = "";
        this.descripcion = descripcion;
        this.costoMinimo = costoMinimo;
        this.costoPorcentual = costoPorcentual;
        this.categoria = 0;
    }
    
    public Cobertura(String id, String descripcion, Integer costoMinimo, Integer costoPorcentual, Integer categoria) {
        this.id = id;
        this.descripcion = descripcion;
        this.costoMinimo = costoMinimo;
        this.costoPorcentual = costoPorcentual;
        this.categoria = categoria;
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

    public Integer getCostoMinimo() {
        return costoMinimo;
    }

    public void setCostoMinimo(Integer costoMinimo) {
        this.costoMinimo = costoMinimo;
    }

    public Integer getCostoPorcentual() {
        return costoPorcentual;
    }

    public void setCostoPorcentual(Integer costoPorcentual) {
        this.costoPorcentual = costoPorcentual;
    }

    public Integer getCategoria() {
        return categoria;
    }

    public void setCategoria(Integer categoria) {
        this.categoria = categoria;
    }
    
}
