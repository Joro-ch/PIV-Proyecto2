/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.logic;

/**
 *
 * @author gorki
 */
public class Marca {
    
    private String marca;
    
    public Marca(String marca){
        this.marca = marca;
    }
    
    public Marca(){
        this.marca = "";
    }
    
    public String getMarca(){
        return this.marca;
    }
    
    public void setMarca(String marca){
        this.marca = marca;
    }
    
}
