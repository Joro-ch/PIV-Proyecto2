
function renderDetallesCoberturas() {
    
    var co = JSON.parse(sessionStorage.getItem("coberturaActual"));
    
    const page = `
        <h1 class = "cuerpo-titulo"> Detalles de la Cobertura ${co.id} <h1>
        <div class="cuerpo-fondo">
            <div class = "datos">
                <h3> ID: ${co.id} </h3>
                <h3> Descripcion: ${co.descripcion} </h3>
                <h3> Costo Minimo: ${co.costoMinimo} </h3>
                <h3> Costo Porcentual: ${co.costoPorcentual} </h3>
                <h3> Categoria: ${co.categoria} </h3> <br>
            </div>
            <a href = "/Frontend_Proyecto2/presentation/admin/categorias/"> Regresar </a>
        </div>
    `;

    const data = document.createElement('div');
    data.classList.add('cuerpo');
    data.innerHTML = page;
    document.body.appendChild(data);
}


