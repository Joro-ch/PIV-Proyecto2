class miCuenta {
    
    contenedor;
    infoCliente;
    infoTarjeta;
    
    constructor() {
        this.getDataCliente();
    }
    
    getDataCliente() {
        const request = new Request(backend + "/login", {method: 'GET', headers: {'Content-Type': 'application/json'}});
        
        (async ()=> {
            const response = await fetch(request);
            
            if (!response.ok) {
                errorMessage(response.status);
                return;
            }
            
            var cliente = await response.json();
            this.renderDatosCliente(cliente);
        })(); 
    }
    
    renderDatosCliente(cliente) {
        const page = `
        <div class = "fondo"></div>
        <div class = "cuerpo">
            <div class = "cuerpo__fondo">
                <h1 class = "cuerpo__Titulo"> ${cliente.nombre}  </h1>
                <div class = "cuerpo-DatosUsuario">
                    <h2 class = "cuerpo-DatosTarjeta__Titulo"> Datos del Usuario </h2>
                    <i class = "fas fa-user cuerpo-form__input-Id-icon cuerpo-DatosUsuario__icon"></i>
                    <h4 class = "cuerpo-DatosUsuario__item"> Nombre: ${cliente.nombre} </h4>
                    <i class = "fas fa-id-card cuerpo-form__input-Id-icon cuerpo-DatosUsuario__icon"></i>
                    <h4 class = "cuerpo-DatosUsuario__item"> Cédula: ${cliente.id} </h4>
                    <i class = "fas fa-key cuerpo-form__input-Id-icon cuerpo-DatosUsuario__icon"></i>
                    <h4 class = "cuerpo-DatosUsuario__item"> Contraseña: ${cliente.clave} </h4>
                    <i class = "fas fa-phone cuerpo-form__input-Id-icon cuerpo-DatosUsuario__icon"></i>
                    <h4 class = "cuerpo-DatosUsuario__item"> Télefono: ${cliente.telefono} </h4>
                    <i class = "fas fa-envelope cuerpo-form__input-Id-icon cuerpo-DatosUsuario__icon"></i>
                    <h4 class = "cuerpo-DatosUsuario__item"> Correo: ${cliente.correo} </h4>
                </div>
                <div class = "cuerpo-DatosTarjeta">
                    <h2 class = "cuerpo-DatosTarjeta__Titulo"> Datos de la Tarjeta </h2>
                    <i class = "fas fa-users cuerpo-form__input-Id-icon cuerpo-DatosTarjeta__icon"></i>
                    <h4 class = "cuerpo-DatosTarjeta__item"> Titular: ${cliente.tarjeta.titular} </h4>
                    <i class = "fas fa-credit-card cuerpo-form__input-Id-icon cuerpo-DatosTarjeta__icon"></i>
                    <h4 class = "cuerpo-DatosTarjeta__item"> Número de Tarjeta: ${cliente.tarjeta.numTarjeta} </h4>
                    <i class = "fas fa-calendar cuerpo-form__input-Id-icon cuerpo-DatosTarjeta__icon"></i>
                    <h4 class = "cuerpo-DatosTarjeta__item"> Fecha de Expiración: ${cliente.tarjeta.fechaExp} </h4>
                    <i class = "fas fa-lock cuerpo-form__input-Id-icon cuerpo-DatosTarjeta__icon"></i>
                    <h4 class = "cuerpo-DatosTarjeta__item"> CVV: ${cliente.tarjeta.codigoSeguridad} </h4>
                </div>
                <a href = "presentation/cliente/cuenta/editarCuenta/show" class = "cuerpo-EditarButton"> Editar Datos </a>
            </div>
        </div>`;
        
        const data = document.createElement('div');
        data.innerHTML = page;
        document.body.appendChild(data);
    }
}

var miCuentaCliente = new miCuenta();