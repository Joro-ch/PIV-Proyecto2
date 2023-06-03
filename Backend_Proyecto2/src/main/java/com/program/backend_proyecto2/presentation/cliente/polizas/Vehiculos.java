/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.presentation.cliente.polizas;

import com.program.backend_proyecto2.logic.Service;
import com.program.backend_proyecto2.logic.Vehiculo;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

/**
 *
 * @author gorki
 */
@Path("/vehiculos")
@PermitAll
public class Vehiculos {
    @Context
    HttpServletRequest request;
    
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Boolean checkPlaca(Vehiculo v) throws Exception {
        Vehiculo aux = Service.instance().checkPlaca(v.getNumPlaca());
        return aux !=null;
    }

}
