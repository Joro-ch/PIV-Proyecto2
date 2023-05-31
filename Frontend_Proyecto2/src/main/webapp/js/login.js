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
    <a href="presentation/registro/" class="cuerpo-form__input-RegistroButton cuerpo-form__item"> Registrarse </a>
  `;

  // Agregar el formulario de inicio de sesión al div
  div.appendChild(loginForm);
  // Agregar el div al body
  document.body.appendChild(div);
});


document.addEventListener("DOMContentLoaded", function () {
  // Obtener el formulario de inicio de sesión
  var loginForm = document.querySelector(".cuerpo-form");

  // Agregar evento submit al formulario
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    var id = document.getElementById("id").value;
    var clave = document.getElementById("clave").value;

    // Construir el objeto de datos para enviar al backend
    var data = {
      id: id,
      clave: clave,
    };

    try {
      // Realizar la solicitud al backend utilizando Fetch
        var response = await fetch(`${backend}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // Manejar la respuesta del backend
        if (response.ok) {
          // Obtener la respuesta como JSON
            var u = await response.json();
            sessionStorage.setItem('user', JSON.stringify(u));
            cambiarPagina(u);
        }else if(response.status === 404){
            alert("usuario o contraseña incorrecto")
        }else {
          throw new Error("Error en la respuesta del servidor.");
        }
    } catch (error) {
      console.error(error);
    }
  });
});


function cambiarPagina(User) {
    // Cambia la página actual a otra URL
    if(User.tipo === 2){
        window.location.href = '/Frontend_Proyecto2/presentation/';
    }else{
        window.location.href = '/Frontend_Proyecto2/presentation/cliente/miCuenta/';
    }
}

      
