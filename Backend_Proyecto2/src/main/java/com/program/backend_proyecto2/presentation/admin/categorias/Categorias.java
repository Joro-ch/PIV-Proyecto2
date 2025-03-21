package com.program.backend_proyecto2.presentation.admin.categorias;

import com.program.backend_proyecto2.logic.Categoria;
import com.program.backend_proyecto2.logic.Cobertura;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAcceptableException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/categorias")
@PermitAll
public class Categorias {
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed({"2"})
    public List<Categoria> getList() throws Exception {
        return Service.instance().getCategorias();
    }
    
    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"2"})
    public void addCatgoria(Categoria c) {
        try {
            Service.instance().categoriaAdd(c);
        }
        catch(Exception ex) {
            throw new NotAcceptableException();
        }
    }
}