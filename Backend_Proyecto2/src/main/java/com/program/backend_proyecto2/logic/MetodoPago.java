package com.program.backend_proyecto2.logic;

public class MetodoPago {
    
    // Atributos
    
    private String id_Titular;
    private String titular;
    private String numTarjeta;
    private String fechaExp;
    private String codigoSeguridad;
    
    // Métodos

    public MetodoPago() {
        this.id_Titular = "";
        this.titular = "";
        this.numTarjeta = "";
        this.fechaExp = "";
        this.codigoSeguridad = "";
    }
    
    public MetodoPago(String id_Titular, String idCliente, String titular, String numTarjeta, String fechaExp, String codigoSeguridad) {
        this.id_Titular = id_Titular;
        this.titular = titular;
        this.numTarjeta = numTarjeta;
        this.fechaExp = fechaExp;
        this.codigoSeguridad = codigoSeguridad;
    }

    public String getId_Titular() {
        return id_Titular;
    }

    public void setId_Titular(String id_Titular) {
        this.id_Titular = id_Titular;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getNumTarjeta() {
        return numTarjeta;
    }

    public void setNumTarjeta(String numTarjeta) {
        this.numTarjeta = numTarjeta;
    }

    public String getFechaExp() {
        return fechaExp;
    }

    public void setFechaExp(String fechaExp) {
        this.fechaExp = fechaExp;
    }

    public String getCodigoSeguridad() {
        return codigoSeguridad;
    }

    public void setCodigoSeguridad(String codigoSeguridad) {
        this.codigoSeguridad = codigoSeguridad;
    }
    
}
