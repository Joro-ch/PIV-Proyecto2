/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
//Primero se va a hacer un fetch al servidor en busca de todas las polizas que tenga de cliente al usuario en sesion.
//Al terminar el fetch se va a llamar al html y se van a mostrar las polizas
//Se va a tener un modal en donde se van a meter los datos de una poliza al darle click. En esta poliza hay que pedir un poco m[as de datos de la poliza.

var polizas;
var container;
var modal;
var modalContent;
const generaMisPolizas = () => {
  const contenido = `
  <div class = "fondo">
            <div class = "cuerpo">
                <table class="table-misPolizas">
                        <thead>
                                <tr>
                                        <th>Numero</th>
                                        <th>Placa</th>
                                        <th>Fecha</th>
                                        <th>Auto</th>
                                        <th> </th>
                                        <th>Valor</th>
                                        <th>Ver</th>
                                </tr>
                        </thead>
                        <tbody>
                                ${polizas.map((poliza) => `
                                    <tr>
                                        <td>${poliza.codigo}</td>
                                        <td>${poliza.vehiculo.numPlaca}</td>
                                        <td>${poliza.fechaInicioVigencia}</td>
                                        <td>${poliza.vehiculo.modelo.marca + ' ' + poliza.vehiculo.modelo.modelo + ' ' + poliza.vehiculo.modelo.anio}</td>
                                        <td><img src="data:image/jpg;base64,${poliza.vehiculo.modelo.imagenBase64}" alt="My Image" witdh="150" height="150"></td>
                                        <td>${poliza.valorSeguro}</td>
                                        <td>  
                                           <a class="ver-poliza" href="#" data-poliza-codigo="${poliza.codigo}"><img src="/Proyectov1/images/ver.png" alt="My Image" height="30" width="30"></a>
                                        </td>
                                    </tr>
                                `).join('')}                                      
                        </tbody>
                </table>
            </div>
        </div>
        <div id="myModal" class="modal">
            <div class="modal-content modal-misPolizas">
        </div>
`; 
    container.innerHTML = contenido;
    modal = document.getElementById('myModal');
    modalContent = document.querySelector('.modal-content');
    const verPolizaLinks = document.querySelectorAll('.ver-poliza');
    window.addEventListener("mousedown", function (event) {
            var targetElement = event.target;

            // Comprobar si el clic ocurrió dentro del modal o sus elementos hijos
            var isClickInsideModal = modal.contains(targetElement);

            // Si el clic ocurrió fuera del modal, cerrarlo
            if (!isClickInsideModal) {
                modal.classList.remove("show");
                modalContent.innerHTML = '';
                let fondo = document.querySelector('.fondo');
                fondo.classList.remove('blur');
            }
        });
    verPolizaLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const codigoPoliza = link.getAttribute('data-poliza-codigo');
            const polizaEncontrada = polizas.find((poliza) => poliza.codigo === codigoPoliza);
            muestraDetalles(polizaEncontrada);
        });
    });
    //Para cerrar el modal
    
    
};


const muestraDetalles = (poliza) => {
    const contenido = `<table>
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
                                <tr>
                                        <td>${poliza.codigo}</td>
                                        <td>${poliza.vehiculo.modelo.modelo} - ${poliza.vehiculo.numPlaca}</td>
                                        <td>${poliza.valorSeguro}</td>
                                        <td>${poliza.plazoPagos}</td>
                                        <td>${poliza.fechaInicioVigencia}</td>
                                        <td> 
                                            <ul>
                                                ${poliza.coberturas.map((cobertura)=>`
                                                    <li>${cobertura.descripcion}</li>
                                                `).join('')}
                                            </ul>
                                        </td>
                                </tr>                                    
                        </tbody>
                </table>`;
    
    modalContent.innerHTML = contenido;
    modal.classList.add('show');
    let fondo = document.querySelector('.fondo');
    fondo.classList.add('blur');
};
const getPolizas = () => {
    const request = new Request(backend + "/polizas", {method: 'GET', headers: {'Content-Type': 'application/json'}});

    (async () => {
        const response = await fetch(request);

        if (!response.ok) {
            alert(response.status+" Error en la solicitud");
            return;
        }

        polizas = await response.json();
        console.log(polizas);
        generaMisPolizas();
    })(); 
    
};


document.addEventListener('DOMContentLoaded', function () {
    container = document.getElementsByClassName('container')[0];
    
    getPolizas();
});