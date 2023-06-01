
function getCategorias() {
    const request = new Request(backend + "/categorias", {method: 'GET', headers: {'Content-Type': 'application/json'}});

    (async ()=> {
        const response = await fetch(request);

        if (!response.ok) {
            errorMessage(response.status);
            return;
        }

        var categorias = await response.json();
        sessionStorage.setItem("categorias", categorias);
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
                <tbody class="cuerpo-tabla__cuerpo">
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
    const editarBoton = document.getElementById("submit");

    // Agrega el listener del evento 'click' al botón
    editarBoton.addEventListener("click", function() {
        agregarCategorias();
    });
}

function agregarCategorias() {
    var descripcion = document.getElementById('descripcion').value;
    
    var categoria = JSON.stringify({
        "id": "",
        "descripcion": descripcion,
        "coberturas": []
    });
    
    const request = new Request(backend + '/categorias/add', {method: 'POST', headers: {'Content-Type': 'application/json'}, 
        body: categoria});
    fetch(request);
    
    window.location.href = '/Frontend_Proyecto2/presentation/admin/categorias/';
}

// Agregar Coberturas
// --------------------------------------------------------------------

function renderAgregarCoberturas() {
    const page = `
        <form class = "cuerpo-form" action = "./presentation/admin/categorias/agregarCob" method = "POST" > 
            <h1 class = "cuerpo-form__titulo"> Cobertura </h1>
            <i class = "fas fa-list cuerpo-form__icon"></i>
            <select class = "cuerpo-form__input" id = "categoria" name = "categoria" required>
                <option value="" disabled selected>Seleccione una Categoria</option>
                <% for(Categoria c:categorias) { %>
                <option id = "categoria" value="<%=c.getId()%>"> <%=c.getId()%> - <%=c.getDescripcion()%> </option>
                <% } %>
            </select>
            <i class = "fas fa-pen cuerpo-form__icon"></i>
            <input class = "cuerpo-form__input" type = "text" id = "descripcion" name = "descripcion" placeholder = "Ingrese la Descripción" autocomplete = "off" required>
            <i class = "fas fa-dollar-sign cuerpo-form__icon"></i>
            <input class = "cuerpo-form__input" type = "text" id = "costoMinimo" name = "costo minimo" placeholder = "Ingrese el Costo Mínimo" autocomplete = "off" required>
            <i class = "fas fa-percent cuerpo-form__icon"></i>
            <input class = "cuerpo-form__input" type = "text" id = "costoPorcentual" name = "costo porcentual" placeholder = "Ingrese el Costo Porcentual" autocomplete = "off" required>
            <input class = "cuerpo-form__submit" type="submit" value = "Agregar">
        </form>
    `;

    const data = document.createElement('div');
    data.classList.add('cuerpo');
    data.innerHTML = page;
    document.body.appendChild(data);
}