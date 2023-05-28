

document.addEventListener("DOMContentLoaded", function() {
  // Crear el elemento div
  var div = document.createElement("div");
  div.classList.add("cuerpo");

  // Crear el elemento form para el inicio de sesión
  var loginForm = document.createElement("form");
  loginForm.classList.add("cuerpo-form");
  loginForm.setAttribute("action", "");
  loginForm.setAttribute("method", "POST");

  // Agregar el contenido HTML al formulario de inicio de sesión
  loginForm.innerHTML = `
    <h1 class="cuerpo-form__titulo cuerpo-form__item"> Login </h1>
    <img class="cuerpo-form__image cuerpo-form__item" src="/Frontend_Proyecto2/images/loginicon1.png" alt=""/>
    <i class="fas fa-user cuerpo-form__input-Id-icon cuerpo-form__item"></i>
    <input class="cuerpo-form__input-Id cuerpo-form__item" autocomplete="off" type="text" id="id" placeholder="Ingrese su Cédula" name="id" required>
    <i class="fas fa-key cuerpo-form__input-Clave-icon cuerpo-form__item"></i>
    <input class="cuerpo-form__input-Clave cuerpo-form__item" autocomplete="off" type="password" id="clave" placeholder="Ingrese su Clave" name="pass" required>
    <input id = "ingresar" class="cuerpo-form__input-Sumit cuerpo-form__item" type="submit" value="Ingresar">
    <h4 class="cuerpo-form__MensajeRegistro cuerpo-form__item"> ¿No tienes cuenta? </h4>
    <a href="presentation/registro/show" class="cuerpo-form__input-RegistroButton cuerpo-form__item"> Registrarse </a>
  `;

  // Agregar el formulario de inicio de sesión al div
  div.appendChild(loginForm);

  // Crear el elemento form para el registro
  var registroForm = document.createElement("form");
  registroForm.classList.add("cuerpo-form");
  registroForm.setAttribute("action", "presentation/registro/View.html");
  registroForm.setAttribute("method", "GET");

  // Agregar el contenido HTML al formulario de registro
  registroForm.innerHTML = `
    <h1 class="cuerpo-form__titulo cuerpo-form__item"> Registro </h1>
    <!-- Agrega aquí los campos adicionales para el registro -->
    <input class="cuerpo-form__input-Sumit cuerpo-form__item" type="submit" value="Registrarse">
    <h4 class="cuerpo-form__MensajeRegistro cuerpo-form__item"> ¿Ya tienes cuenta? </h4>
    <a href="#" class="cuerpo-form__input-RegistroButton cuerpo-form__item"> Iniciar sesión </a>
  `;

  // Agregar el formulario de registro al div
  div.appendChild(registroForm);

  // Agregar el div al body
  document.body.appendChild(div);
});


document.addEventListener("DOMContentLoaded", function() {
  // Obtener el formulario de inicio de sesión
  var loginForm = document.querySelector(".cuerpo-form");

  // Agregar evento submit al formulario
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    var id = document.getElementById("id").value;
    var clave = document.getElementById("clave").value;

    // Construir el objeto de datos para enviar al backend
    var data = {
      id: id,
      clave: clave
    };

    // Realizar la solicitud al backend utilizando Fetch
    fetch(`${backend}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      // Manejar la respuesta del backend
      if (response.ok) {
        // Realizar acciones en caso de éxito
        alert("¡Inicio de sesión exitoso!");
        this.cambiarPagina();
      } else {
        // Realizar acciones en caso de error
        alert("Error al iniciar sesión. Inténtalo nuevamente.");
      }
    })
    .catch(function(error) {
      // Manejar errores de red u otras excepciones
      console.error("Error al realizar la solicitud al backend:", error);
    });
  });
});

function cambiarPagina() {
    // Cambia la página actual a otra URL
    window.location.href = '/Frontend_Proyecto2/presentation/cliente/miCuenta/View.html';
}

      
