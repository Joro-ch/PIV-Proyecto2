
getCategorias();

async function getCategorias() {
    const request = new Request(backend + "/categorias", {method: 'GET', headers: {'Content-Type': 'application/json'}});

    (async () => {
        const response = await fetch(request);

        if (!response.ok) {
            errorMessage(response.status);
            return;
        }

        var categorias = await response.json();
        sessionStorage.setItem("categorias", JSON.stringify(categorias));
    })();
}

// Listado de Categorias
// --------------------------------------------------------------------

function renderListadoCategorias() {
    const page = `
        <h1 class="cuerpo-titulo"> Categorias </h1>
        <div class="cuerpo-fondo">
            <table class="cuerpo-tabla">
                <thead class="cuerpo-tabla__encabezado">
                    <tr> <td class="td-1"> ID </td> <td> Descripcion </td>  <td> Coberturas </td> </tr>
                </thead>
                <tbody id = "cuerpo_tabla" class="cuerpo-tabla__cuerpo">
                </tbody>
            </table>  
            <a class="cuerpo-tabla__categoriaButton" href="/Frontend_Proyecto2/presentation/admin/categorias/agregarCat/"> Agregar Categoria </a>
            <a class="cuerpo-tabla__coberturaButton" href="/Frontend_Proyecto2/presentation/admin/categorias/agregarCob/"> Agregar Coberturas </a>
        </div>
    `;

    const data = document.createElement('div');
    data.classList.add('cuerpo');
    data.innerHTML = page;
    document.body.appendChild(data);
    agregarCategoriasExistentes();
}

function agregarCategoriasExistentes() {
    
    var categorias = sessionStorage.getItem("categorias");
    const tabla = document.getElementById("cuerpo_tabla");

    if (categorias) {
        categorias = JSON.parse(categorias); 

        categorias.forEach(function(c) {
            var row = `
                <tr>
                    <td class="table-image">
                        <h3>${c.id}</h3>
                    </td>
                    <td class="table-calificacion">
                        <h3>${c.descripcion}</h3>
                    </td>
                    <td class="table-coberturas" id="coberturas_${c.id}">
                    </td>
                </tr>
            `;

            tabla.innerHTML += row;
            agregarCoberturasExistentes(c);
        });
    }
}

function agregarCoberturasExistentes(c) {
    const tabla = document.getElementById(`coberturas_${c.id}`); // Acceder a la celda de coberturas correspondiente
    if (c) {
        var coberturas = c.coberturas;
        coberturas.forEach(function (co) {
            var input = document.createElement('input');
            input.id = co.id;
            input.className = "detallesCoberturas";
            input.value = co.descripcion;
            input.type = "button";
            tabla.appendChild(input);
            tabla.appendChild(document.createElement('br'));
        });

        // Agregar evento de clic a todos los elementos con la clase "detallesCoberturas"
        var detallesCoberturasElements = document.querySelectorAll('.detallesCoberturas');
        detallesCoberturasElements.forEach(function (element) {
            element.addEventListener('click', function (event) {
                var clickedId = event.target.id; // Obtener el id del elemento que se ha presionado
                findCoberturaById(clickedId);
                
                window.location.href = '/Frontend_Proyecto2/presentation/admin/categorias/detalles/';

                setTimeout(function () {
                    window.location.reload();
                }, 500);
             });
        });
    }
}

// Agregar Categorias
// --------------------------------------------------------------------

function renderAgregarCategorias() {
    const page = `
        <form class = "cuerpo-form" action = "" method = "POST">
            <h1 class = "cuerpo-form__titulo"> Categoria </h1>
            <i class = "fas fa-pen cuerpo-form__icon"></i>
            <input class = "cuerpo-form__input" type = "text" id = "descripcion" placeholder = "Ingrese la Descripción" name = "descripcion" autocomplete = "off" required>
            <input id = "submit" class = "cuerpo-form__submit" type = "button" value = "Agregar">
        </form>
    `;

    const data = document.createElement('div');
    data.classList.add('cuerpo');
    data.innerHTML = page;
    document.body.appendChild(data);
    
    // Obtén una referencia al botón de edición
    const agregarBoton = document.getElementById("submit");

    // Agrega el listener del evento 'click' al botón
    agregarBoton.addEventListener("click", function() {
        agregarCategorias();
    });
}

async function agregarCategorias() {
    var descripcion = document.getElementById('descripcion').value;
    
    var categoria = JSON.stringify({
        "id": "",
        "descripcion": descripcion,
        "coberturas": []
    });
    
    const request = new Request(backend + '/categorias/add', {method: 'POST', headers: {'Content-Type': 'application/json'}, 
        body: categoria});
        
    await fetch(request); // Esperar a que la solicitud se complete
    
    await getCategorias(); // Esperar a que se obtengan las categorías actualizadas
    
    window.location.href = '/Frontend_Proyecto2/presentation/admin/categorias/';
    
    setTimeout(function () {
        window.location.reload();
    }, 500);
}

// Agregar Coberturas
// --------------------------------------------------------------------

function renderAgregarCoberturas() {
    const page = `
        <form class = "cuerpo-form" action = "" method = "POST" > 
            <h1 class = "cuerpo-form__titulo"> Cobertura </h1>
            <i class = "fas fa-list cuerpo-form__icon"></i>
            <select class = "cuerpo-form__input" id = "categoria" name = "categoria" required>
                <option value="" disabled selected>Seleccione una Categoria</option>
            </select>
            <i class = "fas fa-pen cuerpo-form__icon"></i>
            <input class = "cuerpo-form__input" type = "text" id = "descripcion" name = "descripcion" placeholder = "Ingrese la Descripción" autocomplete = "off" required>
            <i class = "fas fa-dollar-sign cuerpo-form__icon"></i>
            <input class = "cuerpo-form__input" type = "text" id = "costoMinimo" name = "costo minimo" placeholder = "Ingrese el Costo Mínimo" autocomplete = "off" required>
            <i class = "fas fa-percent cuerpo-form__icon"></i>
            <input class = "cuerpo-form__input" type = "text" id = "costoPorcentual" name = "costo porcentual" placeholder = "Ingrese el Costo Porcentual" autocomplete = "off" required>
            <input class = "cuerpo-form__submit" type="button" id = "coberturas_Button" value = "Agregar">
        </form>
    `;

    const data = document.createElement('div');
    data.classList.add('cuerpo');
    data.innerHTML = page;
    document.body.appendChild(data);
    agregarOpcionesCategorias();
    
    // Obtén una referencia al botón de edición
    const agregarBoton = document.getElementById("coberturas_Button");

    // Agrega el listener del evento 'click' al botón
    agregarBoton.addEventListener("click", function() {
        agregarCoberturas();
    });
}

function agregarOpcionesCategorias() {

    var categorias = sessionStorage.getItem("categorias");
    const tabla = document.getElementById("categoria");

    if (categorias) {
        categorias = JSON.parse(categorias); // Convertir a objeto JavaScript

        categorias.forEach(function(c) {
            var row = `
                <option id="categoria" value="${c.id}">${c.id} - ${c.descripcion}</option>
            `;
            tabla.innerHTML += row;
        });
    }
}

async function agregarCoberturas() {
    var categoria = document.getElementById('categoria').value;
    var descripcion = document.getElementById('descripcion').value;
    var costoMinimo = document.getElementById('costoMinimo').value;
    var costoPorcentual = document.getElementById('costoPorcentual').value;
    
    var coberturaJSON = JSON.stringify({
        "id": "",
        "descripcion": descripcion,
        "costoMinimo": costoMinimo,
        "costoPorcentual": costoPorcentual,
        "categoria": categoria
    });
    
    const request = new Request(backend + '/coberturas/add/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: coberturaJSON
    });
    
    await fetch(request); // Esperar a que la solicitud se complete
    await getCategorias(); // Esperar a que se obtengan las categorías actualizadas
    
    window.location.href = '/Frontend_Proyecto2/presentation/admin/categorias/';
}

function findCoberturaById(coberturaId) {
    const categorias = JSON.parse(sessionStorage.getItem("categorias"));
    
    if (!categorias) {
        return null; // Si no hay categorías almacenadas, devuelve null
    }

    const coberturas = categorias.flatMap(categoria => categoria.coberturas);

    for (let i = 0; i < coberturas.length; i++) {
        if (coberturas[i].id === coberturaId) {
            sessionStorage.setItem("coberturaActual", JSON.stringify(coberturas[i]));
            return coberturas[i];
        }
    }
    return null; // Si no se encuentra la cobertura, se devuelve null
}

