package com.program.backend_proyecto2;

//import com.program.backend_proyecto2.presentation.admin.modelos.modelos;
import com.program.backend_proyecto2.presentation.cuentaCliente.EditarCuenta;
import com.program.backend_proyecto2.presentation.login.Login;
import com.program.backend_proyecto2.presentation.registro.Registro;
import jakarta.annotation.security.DeclareRoles;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("api")
@DeclareRoles({"2","1"})
public class JakartaRestConfiguration extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(Login.class); 
        classes.add(Registro.class);
        classes.add(EditarCuenta.class);
        //classes.add(modelos.class);
        return classes;
    }   
}
