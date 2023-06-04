/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.presentation.admin.marcas;

import com.program.backend_proyecto2.logic.Marca;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

/**
 *
 * @author gorki
 */
@Path("/marcas")
@PermitAll
public class marcas {
    @Context
    HttpServletRequest request;
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed({"2","1"})
    public List<String> getMarcas() throws Exception{
        return Service.instance().getMarcas();
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"2"})
    public void addMarca(Marca m) throws Exception{
        Service.instance().marcaAdd(m);
    }
}
