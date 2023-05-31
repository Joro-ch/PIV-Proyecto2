
this.getDataCliente();

function getDataCliente() {
    const request = new Request(backend + "/login", {method: 'GET', headers: {'Content-Type': 'application/json'}});

    (async ()=> {
        const response = await fetch(request);

        if (!response.ok) {
            errorMessage(response.status);
            return;
        }

        var cliente = await response.json();
        this.renderEditarCliente(cliente);
    })(); 
}

function renderEditarCliente(cliente) {
    const page = `
        <div class = "cuerpo">
            <form class = "cuerpo-form" action = "" method = "POST"> 
                <img class ="cuerpo-form__img" src="/Proyectov1/images/loginicon1.png" alt=""/>
                <div class = "cuerpo-form__DatosUsuario">
                    <h2 class ="cuerpo-form__DatosUsuario-titulo"> Datos del Cliente </h2>
                    <i class = "fas fa-id-card cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="text" id="id" autocomplete="off" value = "${cliente.usuario.id}" name = "id" readonly>
                    <i class = "fas fa-key cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="password" id="clave" autocomplete="off" value = "${cliente.usuario.clave}" name="clave" required>
                    <i class = "fas fa-user cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="text" id="nombre" autocomplete="off" value = "${cliente.nombre}" name="nombre" required>
                    <i class = "fas fa-phone cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="text" id="telefono" autocomplete="off" value = "${cliente.telefono}" name="telefono" required>
                    <i class = "fas fa-envelope cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="email" id="correo" autocomplete="off" value = "${cliente.correo}" name="correo" required>
                </div>
                <div class = "cuerpo-form__DatosTarjeta">
                    <h2 class ="cuerpo-form__DatosTarjeta-titulo cuerpo-form__item"> Datos de la Tarjeta </h2>
                    <i class = "fas fa-users cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="text" id="titular" autocomplete="off" value = "${cliente.tarjeta.titular}" name="titular" required>
                    <i class = "fas fa-credit-card cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="text" id="numTarjeta" autocomplete="off" value = "${cliente.tarjeta.numTarjeta}" name="numTarjeta" required>
                    <i class = "fas fa-calendar cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="date" id="fechaExp" autocomplete="off" value = "${cliente.tarjeta.fechaExp}" name="fechaExp" required>
                    <i class = "fas fa-lock cuerpo-form__input-icon"></i>
                    <input class = "cuerpo-form__input" type="text" id="codigoSeguridad" autocomplete="off" value = "${cliente.tarjeta.codigoSeguridad}" name="codigoSeguridad" required>
                </div>
                <input id = "editarDatos" class = "cuerpo-form__Submit" type="button" value="Editar">
            </form>
        </div>`;

    const data = document.createElement('div');
    data.innerHTML = page;
    document.body.appendChild(data);
    
    // Obtén una referencia al botón de edición
    const editarBoton = document.getElementById("editarDatos");

    // Agrega el listener del evento 'click' al botón
    editarBoton.addEventListener("click", function() {
        editarDatosCliente();
    });
}

function editarDatosCliente() {
    
    var id = document.getElementById('id').value;
    var clave = document.getElementById('clave').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var titular = document.getElementById('titular').value;
    var numTarjeta = document.getElementById('numTarjeta').value;
    var fechaExp = document.getElementById('fechaExp').value;
    var codigoSeguridad = document.getElementById('codigoSeguridad').value;

    var cuenta_json = JSON.stringify({
        "usuario": {
            "id": id,
            "clave": clave
        },
        "nombre": nombre,
        "telefono": telefono,
        "correo": correo,
        "tarjeta": {
            "id_Titular": id,
            "titular": titular,
            "numTarjeta": numTarjeta,
            "fechaExp": fechaExp,
            "codigoSeguridad": codigoSeguridad
        }
    });

    const request = new Request(backend + "/editarCliente", {method: 'POST', headers: {'Content-Type': 'application/json'}, 
        body: cuenta_json});
    fetch(request);
    
    window.location.href = '/Frontend_Proyecto2/presentation/cliente/miCuenta/';
};