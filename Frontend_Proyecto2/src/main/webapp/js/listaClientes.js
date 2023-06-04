function getListaClientes() {
  const request = new Request(backend + "/clientes", {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });

  (async () => {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        errorMessage(response.status);
        return;
      }

      const clientes = await response.json();
      renderListaClientes(clientes);
    } catch (error) {
      console.error(error);
    }
  })();
}

function renderListaClientes(clientes) {
  const page = `
    <div class="fondo">
      <div class="cuerpo">
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
            ${clientes.map(cliente => `
              <tr>
                <td>${cliente.nombre}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.correo}</td>
                <td>
                  <a href="javascript:void(0)" onclick="obtenerPolizasCliente('${cliente.id}')">
                    <img src="/Frontend_Proyecto2/images/poliza.png" alt="My Image" height="30" width="30">
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>`;

  const data = document.createElement('div');
  data.innerHTML = page;
  document.body.appendChild(data);
}
async function obtenerPolizasCliente(cliente) {
    console.log(cliente);
  try {
    const request = new Request(backend + `/polizas/cliente/${cliente}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error('Error al obtener las pólizas del cliente');
    }
    const polizas = await response.json();
    console.log(polizas);
  } catch (error) {
    console.error(error);
  }
}

const renderPolizas = (polizas) => {
  const page = `
    <div class="fondo">
      <div class="cuerpo">
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Vehiculo</th>
              <th>Valor Seguro</th>
              <th>PlazoPagos</th>
              <th>Fecha de inicio</th>
              <th>Coberturas</th>
            </tr>
          </thead>
          <tbody>
            ${polizas.map(poliza => `
              <tr>
                <td>${poliza.codigo}</td>
                <td>${poliza.vehiculo.modelo.modelo} - ${poliza.vehiculo.modelo}</td>
                <td>${poliza.valorSeguro}</td>
                <td>${poliza.plazoPagos}</td>
                <td>${poliza.fechaInicioVigencia}</td>
                <td>
                  <ul>
                    ${poliza.coberturas.map(cobertura => `
                      <li>${cobertura.descripcion}</li>
                    `).join('')}
                  </ul>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>`;

  // Reemplazar el contenido existente con el contenido de las pólizas
  const cuerpo = document.querySelector('.cuerpo');
  cuerpo.innerHTML = page;
  };
  
document.addEventListener("DOMContentLoaded", function() {
    getListaClientes();
});