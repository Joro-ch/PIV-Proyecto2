package com.program.backend_proyecto2;

import com.program.backend_proyecto2.presentation.cuentaCliente.EditarCuenta;
import com.program.backend_proyecto2.presentation.login.Login;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("api")
public class JakartaRestConfiguration extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(Login.class); 
        classes.add(EditarCuenta.class);
        return classes;
    }   
}
