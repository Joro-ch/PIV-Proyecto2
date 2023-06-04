/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.presentation.admin.clientes;

import com.program.backend_proyecto2.logic.Cliente;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/clientes")
public class Clientes {
    
    @GET
    @RolesAllowed({"2"})
    @Produces({MediaType.APPLICATION_JSON})
    public Response getListaClientes() {
        try {
            // Lógica para recuperar la lista de clientes desde el servicio
            List<Cliente> clientes = Service.instance().getClientes();

            // Retornar la lista de clientes como respuesta JSON
            return Response.ok(clientes).build();
        } catch (Exception e) {
            // En caso de error, retornar una respuesta de error con un mensaje
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al recuperar la lista de clientes").build();
        }
    }
    
}
