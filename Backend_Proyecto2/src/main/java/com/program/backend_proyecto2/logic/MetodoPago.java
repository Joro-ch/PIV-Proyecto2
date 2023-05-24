package com.program.backend_proyecto2.logic;

public class MetodoPago {
    
    // Atributos
    
    private String titular;
    private String numTarjeta;
    private String fechaExp;
    private String codigoSeguridad;
    
    // Métodos

    public MetodoPago() {
        this.titular = "";
        this.numTarjeta = "";
        this.fechaExp = "";
        this.codigoSeguridad = "";
    }
    
    public MetodoPago(String idCliente, String titular, String numTarjeta, String fechaExp, String codigoSeguridad) {
        this.titular = titular;
        this.numTarjeta = numTarjeta;
        this.fechaExp = fechaExp;
        this.codigoSeguridad = codigoSeguridad;
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
