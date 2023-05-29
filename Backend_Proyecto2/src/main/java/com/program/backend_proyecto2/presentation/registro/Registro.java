package com.program.backend_proyecto2.presentation.registro;

import com.program.backend_proyecto2.logic.Cliente;
import com.program.backend_proyecto2.logic.MetodoPago;
import com.program.backend_proyecto2.logic.Service;
import com.program.backend_proyecto2.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
@Path("/registro")
@PermitAll
public class Registro {
    @Context
    HttpServletRequest request;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public Response registro(Cliente c){
        System.out.println(c);
        
        return Response.ok().build();
    }
}
