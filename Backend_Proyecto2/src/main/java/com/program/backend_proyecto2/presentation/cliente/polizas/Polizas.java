/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.presentation.cliente.polizas;

import com.program.backend_proyecto2.logic.Poliza;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author gorki
 */

@Path("/polizas")
@PermitAll
public class Polizas {
    @Context
    HttpServletRequest request;
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Poliza setPoliza(Poliza p) throws Exception {
        LocalDate fechaActual = LocalDate.now();
        DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String fechaComoString = fechaActual.format(formatoFecha);
        p.setFechaInicioVigencia(fechaComoString);
        p.precioTotal();
        
        return p;
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/add")
    public void addPoliza(Poliza p) throws Exception {
        Service.instance().polizaAdd(p);
    }
}
