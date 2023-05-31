/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.program.backend_proyecto2.resources;

import com.program.backend_proyecto2.logic.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.security.enterprise.AuthenticationException;
import jakarta.security.enterprise.AuthenticationStatus;
import jakarta.security.enterprise.authentication.mechanism.http.HttpAuthenticationMechanism;
import jakarta.security.enterprise.authentication.mechanism.http.HttpMessageContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.sql.Array;
import java.util.Arrays;
import java.util.HashSet;

@ApplicationScoped
public class CustomAuthentication 
  implements HttpAuthenticationMechanism {

    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest request, HttpServletResponse response, HttpMessageContext context){
        Usuario user = (Usuario) request.getSession().getAttribute("user");
        if(user != null){
            System.out.println("El usuario en el request: "+user.getId()+" y su tipo: "+user.getTipo());
        }
        if(user!=null)
            return context.notifyContainerAboutLogin(
                new Principal() {@Override public String getName(){return user.getId();}},
                new HashSet<>(Arrays.asList(new String[]{Integer.toString(user.getTipo())})));
        else
           return context.notifyContainerAboutLogin(
                new Principal() {@Override public String getName(){return "none";}},
                new HashSet<>()); 
    }
        
    
}
