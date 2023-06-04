/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.presentation.cliente.polizas;

import com.program.backend_proyecto2.logic.Poliza;
import com.program.backend_proyecto2.logic.Service;
import com.program.backend_proyecto2.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAcceptableException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
    @RolesAllowed({"1"})
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
    @RolesAllowed({"1"})
    public void addPoliza(Poliza p) throws Exception {
        HttpSession session = request.getSession(false);
        Usuario user = (Usuario) session.getAttribute("user");
        if(p.getVehiculo().getIdPropietario().equals(user.getId())){
            Service.instance().vehiculoAdd(p.getVehiculo());
            Service.instance().polizaAdd(p);
        }else{
            throw new NotAcceptableException();
        }
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"1"})
    public List<Poliza> getPolizasCliente()throws Exception{
        HttpSession session = request.getSession(false);
        Usuario user = (Usuario) session.getAttribute("user");
        return Service.instance().polizasCliente(user.getId());
    }
}
