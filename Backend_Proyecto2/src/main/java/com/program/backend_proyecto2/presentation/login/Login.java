package com.program.backend_proyecto2.presentation.login;

import com.program.backend_proyecto2.logic.Cliente;
import com.program.backend_proyecto2.logic.Service;
import com.program.backend_proyecto2.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAcceptableException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;


@Path("/login")
@PermitAll
public class Login { 
    @Context
    HttpServletRequest request;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario login(Usuario user){
        Usuario logged;
        try{
            logged = Service.instance().usuarioFind(user.getId());
            if(!logged.getClave().equals(user.getClave())) throw new Exception("Wrong password");
            request.getSession(true).setAttribute("user", logged);
            Usuario user2 = (Usuario)request.getSession().getAttribute("user");
            System.out.println("Usuario almacenado en la sesión: " + user2.getId());
            return logged;
        } catch (Exception ex){
            throw new NotFoundException();
        }
    }
    
    @DELETE
    public void logout(){
        HttpSession session = request.getSession(true);
        session.removeAttribute("user");
        session.invalidate();   
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Cliente getClienteData() {
        Usuario usuario = (Usuario) request.getSession().getAttribute("user");
        if (usuario != null) {
            try {
                Cliente aux = Service.instance().clienteFind(usuario);
                return aux;
            } catch (Exception ex) {
                throw new NotAcceptableException();
            }
        } 
        else {
            // Manejar el caso en el que no haya usuario en la sesión
            throw new NotAcceptableException();
        }
    }
}
