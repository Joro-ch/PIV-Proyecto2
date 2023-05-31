package com.program.backend_proyecto2.presentation.registro;

import com.program.backend_proyecto2.logic.Cliente;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
@Path("/registro")
@PermitAll
public class Registro {   
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registro(Cliente c) throws Exception{
        Service.instance().usuarioAdd(c.getUsuario());
        Service.instance().tarjetaAdd(c.getTarjeta());
        Service.instance().clienteAdd(c);
        
        String mensaje = "Registro exitoso"; // Mensaje que deseas enviar al frontend
        return Response.ok().entity(mensaje).build();
    }
}
