document.addEventListener("DOMContentLoaded", function() {
  // Crear el elemento div
  var div = document.createElement("div");
  div.classList.add("cuerpo");
  
    // Crear el elemento form para el registro
  var registroForm = document.createElement("form");
  registroForm.classList.add("cuerpo-form");
  registroForm.setAttribute("action", "presentation/registro/View.html");
  registroForm.setAttribute("method", "GET");

  // Agregar el contenido HTML al formulario de registro
  registroForm.innerHTML = `
    <img class ="cuerpo-form__img" src="/Frontend_Proyecto2/images/loginicon1.png" alt=""/>
    <div class = "cuerpo-form__DatosUsuario">
        <h2 class ="cuerpo-form__DatosUsuario-titulo"> Datos del Cliente </h2>
        <i class = "fas fa-id-card cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="text" id="id" autocomplete="off" placeholder="Ingrese su Cédula" name="id" required>
        <i class = "fas fa-key cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="password" id="clave" autocomplete="off" placeholder="Ingrese su Clave" name="clave" required>
        <i class = "fas fa-user cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="text" id="nombre" autocomplete="off" placeholder="Ingrese su Nombre" name="nombre" required>
        <i class = "fas fa-phone cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="text" id="telefono" autocomplete="off" placeholder="Ingrese su Télefono" name="telefono" required>
        <i class = "fas fa-envelope cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="email" id="correo" autocomplete="off" placeholder="Ingrese su Correo" name="correo" required>
    </div>
    <div class = "cuerpo-form__DatosTarjeta">
        <h2 class ="cuerpo-form__DatosTarjeta-titulo cuerpo-form__item"> Datos de la Tarjeta </h2>
        <i class = "fas fa-users cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="text" id="titular" autocomplete="off" placeholder="Ingrese el Titular" name="titular" required>
        <i class = "fas fa-credit-card cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="text" id="numTarjeta" autocomplete="off" placeholder="Ingrese el Número de Tarjeta" name="numTarjeta" required>
        <i class = "fas fa-calendar cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="date" id="fechaExp" autocomplete="off" placeholder="Ingrese la Fecha de Expiración" name="fechaExp" required>
        <i class = "fas fa-lock cuerpo-form__input-icon"></i>
        <input class = "cuerpo-form__input" type="text" id="codigoSeguridad" autocomplete="off" placeholder="Ingrese el Codigo de Seguridad (CVV)" name="codigoSeguridad" required>
    </div>
    <input class = "cuerpo-form__Submit" type="submit" value="Registrarse">
  `;

  // Agregar el formulario de registro al div
  div.appendChild(registroForm);
  // Agregar el div al body
  document.body.appendChild(div);
});


document.addEventListener("DOMContentLoaded", function() {
  // Obtener el formulario de inicio de sesión
    var registroForm = document.querySelector(".cuerpo-form");

    // Agregar evento submit al formulario
    registroForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        var titular = document.getElementById("titular").value;
        var numTarjeta = document.getElementById("numTarjeta").value;
        var fechaExp = document.getElementById("fechaExp").value;
        var codigoSeguridad = document.getElementById("codigoSeguridad").value;

        var id = document.getElementById("id").value;
        var clave = document.getElementById("clave").value;
        var nombre = document.getElementById("nombre").value;
        var telefono = document.getElementById("telefono").value;
        var correo = document.getElementById("correo").value;
        
        
        var clienteJSON = JSON.stringify({
        "usuario": {
            "id": id,
            "clave": clave,
            "tipo": 1
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
        try{
           var response = await fetch(`${backend}/registro`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: clienteJSON
            });
            if (response.ok) {
            // Realizar acciones en caso de éxito
                alert('Registro Exitoso');
                window.location.href = '/Frontend_Proyecto2/presentation/login/';
            } else {
            // Realizar acciones en caso de error
                alert("Error al registrarse");
            }
        }catch(error){console.log(error);}
      
      });
});
      
    
