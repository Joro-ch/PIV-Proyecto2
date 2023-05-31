/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.presentation.admin.modelos;
import com.program.backend_proyecto2.logic.Modelo;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import java.io.InputStream;
import java.util.List;
import org.apache.commons.io.IOUtils;
import org.glassfish.jersey.media.multipart.FormDataParam;
/**
 *
 * @author gorki
 */
@Path("/modelos")
@PermitAll
public class modelos {
    @Context
    HttpServletRequest request;
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Modelo> getModelos() throws Exception{
       return Service.instance().getModelos();
    }
    
    @POST
    @Consumes({MediaType.MULTIPART_FORM_DATA})
    public void addModelo(@FormDataParam("modelo") String modelo,
            @FormDataParam("anio") String anio,
            @FormDataParam("marca") String marca,
            @FormDataParam("imagen") InputStream imagenInputStream) throws Exception {
        byte[] imagenBytes = IOUtils.toByteArray(imagenInputStream);
        Modelo m = new Modelo(modelo, anio, marca, imagenBytes);
        Service.instance().ModeloAdd(m);
    }

}
