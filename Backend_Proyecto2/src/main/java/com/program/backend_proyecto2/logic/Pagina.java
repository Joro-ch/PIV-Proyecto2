package com.program.backend_proyecto2.logic;

import java.util.ArrayList;
import java.util.List;

public class Pagina {
    
    private static Pagina instancia;
    
    public static Pagina instance() {
        if (instancia == null) {
            instancia = new Pagina();
        }
        return instancia;
    }
    
    // Atributos
    
    private List<String> modelos;
    private List<Categoria> categorias;
    private List<Cobertura> coberturas;
    private List<Poliza> polizas;
    private List<MetodoPago> metodosPago;
    
    // Métodos

    public Pagina() {
        this.modelos = new ArrayList<>();
        this.categorias = new ArrayList<>();
        this.coberturas = new ArrayList<>();
        this.polizas = new ArrayList<>();
        this.metodosPago = new ArrayList<>();
    }

    public Pagina(List<String> modelos, List<Categoria> categorias, List<Cobertura> coberturas, List<Poliza> polizas, List<MetodoPago> metodosPago) {
        this.modelos = modelos;
        this.categorias = categorias;
        this.coberturas = coberturas;
        this.polizas = polizas;
        this.metodosPago = metodosPago;
    }
    
    public List<String> getModelos() {
        return modelos;
    }

    public void setModelos(List<String> modelos) {
        this.modelos = modelos;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }

    public List<Cobertura> getCoberturas() {
        return coberturas;
    }

    public void setCoberturas(List<Cobertura> coberturas) {
        this.coberturas = coberturas;
    }

    public List<Poliza> getPolizas() {
        return polizas;
    }

    public void setPolizas(List<Poliza> polizas) {
        this.polizas = polizas;
    }

    public List<MetodoPago> getMetodosPago() {
        return metodosPago;
    }

    public void setMetodosPago(List<MetodoPago> metodosPago) {
        this.metodosPago = metodosPago;
    }
    
    // Métodos Específicos
    
    public void addModelo(String modelo) {
        modelos.add(modelo);
    }
    
    public void addCategoria(Categoria categoria) {
        categoria.setId(String.valueOf(categorias.size() + 1));
        categorias.add(categoria);
    }
    
    public void addCoberturas(Cobertura cobertura) {
        coberturas.add(cobertura);
    }
    
    public void addPoliza(Poliza poliza) {
        poliza.setCodigo(String.valueOf(polizas.size() + 1));
        polizas.add(poliza);
    }
    
    public void addMetodoPago(MetodoPago metodoPago) {
        metodosPago.add(metodoPago);
    }
    
    public List<Cobertura> getCoberturasByCategoria(String categoriaID) {
        List<Cobertura> auxLista = new ArrayList();
        
        for(int i = 0; i < categorias.size(); i++) {
            if(String.valueOf(coberturas.get(i).getCategoria()).equals(categoriaID)) {
                auxLista.add(coberturas.get(i));
            }
        }
        
        return auxLista;
    }
    
}
