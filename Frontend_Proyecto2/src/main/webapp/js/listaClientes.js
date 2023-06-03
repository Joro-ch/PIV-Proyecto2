function getListaClientes() {
    const request = new Request(backend + "/listaClientes", {method: 'GET', headers: {'Content-Type': 'application/json'}});

    (async ()=> {
        const response = await fetch(request);

        if (!response.ok) {
            errorMessage(response.status);
            return;
        }

        var clientes = await response.json();
        this.renderListaClientes(clientes);
    })(); 
}

function renderListaClientes(clientes) {
    const page = `
        <div class = "fondo">
            <div class = "cuerpo">
                <table>
                        <thead>
                                <tr>
                                        <th>nombre</th>
                                        <th>telefono</th>
                                        <th>correo</th>
                                        <th>polizas</th>
                                </tr>
                        </thead>
                        <tbody>
                                <forEach var="cliente" items="${clientes}">
                                        <tr>
                                                <td>${cliente.nombre}</td>
                                                <td>${cliente.telefono}</td>
                                                <td>${cliente.correo}</td>
                                                <td>  
                                                    <a id="polizasCliente" href="./presentation/admin/clientes/polizas?id=${cliente.id}"><img src="/Proyectov1/images/poliza.png" alt="My Image" height="30" width="30"></a>
                                                </td>
                                        </tr>
                                </forEach>                                       
                        </tbody>
                </table>
            </div>
        </div>`;

    const data = document.createElement('div');
    data.innerHTML = page;
    document.body.appendChild(data);
    
    // Obtén una referencia al botón de edición
    const clienteBoton = document.getElementById("polizasCliente");

    // Agrega el listener del evento 'click' al botón
    clienteBoton.addEventListener("click", function() {
        polizasCliente();
    });
}

function polizasCliente(){
    console.log("Llega hasta el link de polizas cliente");
}

document.addEventListener("DOMContentLoaded", function() {
    getListaClientes();
});