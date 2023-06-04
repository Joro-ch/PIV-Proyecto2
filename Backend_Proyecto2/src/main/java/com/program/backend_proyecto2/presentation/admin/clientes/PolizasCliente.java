/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.presentation.admin.clientes;

import com.program.backend_proyecto2.logic.Cliente;
import com.program.backend_proyecto2.logic.Poliza;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/polizas/cliente")
public class PolizasCliente {
    @GET
    @Path("/{clienteId}")
    @RolesAllowed({"2"})
    @Produces({MediaType.APPLICATION_JSON})
    public Response getPolizasCliente(@PathParam("clienteId") String clienteId) {
        try {
            // Lógica para obtener las pólizas del cliente
            List<Poliza> polizas = Service.instance().polizasCliente(clienteId);

            // Retornar las pólizas como respuesta JSON
            return Response.ok(polizas).build();
        } catch (Exception e) {
            // En caso de error, retornar una respuesta de error con un mensaje
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al obtener las pólizas del cliente").build();
        }
    }
}
