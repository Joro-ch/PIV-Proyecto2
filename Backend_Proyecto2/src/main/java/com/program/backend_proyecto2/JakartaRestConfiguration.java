package com.program.backend_proyecto2;

import com.program.backend_proyecto2.presentation.admin.categorias.Categorias;
import com.program.backend_proyecto2.presentation.admin.clientes.Clientes;
import com.program.backend_proyecto2.presentation.admin.clientes.PolizasCliente;
import com.program.backend_proyecto2.presentation.admin.coberturas.Coberturas;
import com.program.backend_proyecto2.presentation.admin.marcas.marcas;
import com.program.backend_proyecto2.presentation.admin.modelos.modelos;
import com.program.backend_proyecto2.presentation.cliente.polizas.Polizas;
import com.program.backend_proyecto2.presentation.cliente.polizas.Vehiculos;
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
        classes.add(modelos.class);
        classes.add(marcas.class);
        classes.add(Categorias.class);
        classes.add(Vehiculos.class);
        classes.add(Coberturas.class);
        classes.add(Polizas.class);
        classes.add(Clientes.class);
        classes.add(PolizasCliente.class);
        return classes;
    }   
}
