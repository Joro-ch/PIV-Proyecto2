package com.program.backend_proyecto2.presentation.cuentaCliente;

import com.program.backend_proyecto2.logic.Cliente;
import com.program.backend_proyecto2.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;

@Path("/editarCliente")
@PermitAll
public class EditarCuenta {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void actualizarCliente(Cliente c) {
        try {
            Service.instance().clienteUpdate(c);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }
}
