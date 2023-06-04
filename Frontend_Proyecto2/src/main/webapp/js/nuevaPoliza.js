/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

//Primero vamos a meter la placa, seleccionar el modelo y meter el anio del vehiculo, adem[as de su valor y la frecuencia del pago. 
//Es importante mandar una solicitud al servidor esperando un bool para ver que no existan problemas y la placa no exista ya.
//Luego de esto va la segunda pagina 
//En la segunda pagina se van a mostrar las coberturas disponibles
//Por ultimo se va a mostrar el precio total que va a tener la poliza. Empezamos 
var modelos;
var hashModelos= {};
var container;
var plazo;
var vehiculoConst;
var poliza = {};
var coberturas;
var selectedCoberturas;
var cliente;
const generaParte1 = () => {
    
    const brandHash = {};

    Object.values(hashModelos).forEach(({ marca }) => {
        if (marca) {
            brandHash[marca] = true;
    }
    });

    console.log(brandHash);
    const contenido = `
          <div class = "cuerpo">
            <form class = "cuerpo-form">
                <h1 class = "cuerpo-form__titulo"> Póliza </h1>

                <i class="fas fa-hashtag cuerpo-form__icon cuerpo-form__item"></i>
                <input class = "cuerpo-form__input cuerpo-form__item" autocomplete="off" type = "text" id = "id" placeholder="Ingrese la Placa" name="numPlaca" required>    
                <i class="fas fa-car cuerpo-form__icon cuerpo-form__item"></i>
                <select class="cuerpo-form__item cuerpo-form__input" id="marca" name="modelo" required>
                    <option value="" disabled selected>Seleccione un modelo</option>
                    ${Object.entries(brandHash).map(([brand]) => `
                        <optgroup label="${brand}">
                            ${Object.entries(hashModelos).map(([modelo, { marca }]) => {
                                if (marca === brand) {
                                    return `<option value="${modelo}">${modelo}</option>`;
                                }
                                return '';
                            }).join('')}
                        </optgroup>
                    `).join('')}
                </select>
                <i class="fas fa-calendar cuerpo-form__icon cuerpo-form__item"></i>
                <select class="cuerpo-form__item cuerpo-form__input" id = "anio" name="anio" required>
                    <option value="" disabled selected>Seleccione un anio</option>
                </select>

                <i class="fas fa-dollar-sign cuerpo-form__icon cuerpo-form__item"></i>
                <input class = "cuerpo-form__input cuerpo-form__item" autocomplete="off" type = "text" id = "valor" placeholder="Ingrese el Valor" name="valor" required>
                
                <div class = "cuerpo-form__item cuerpo-form__radio">
                    <i class="fas fa-credit-card cuerpo-form__icon cuerpo-form__item" id="iconCheck"></i>
                    <label class="cuerpo-form__label cuerpo-form__item radio">
                        <input type="radio" name="opcion" value="trimestral">
                        <span class="checkmark">Trimestral</span>
                    </label>
                    <label class="cuerpo-form__label cuerpo-form__item radio">
                        <input type="radio" name="opcion" value="semestral">
                        <span class="checkmark">Semestral</span>
                    </label>
                    <label class="cuerpo-form__label cuerpo-form__item radio">
                        <input type="radio" name="opcion" value="anual">
                        <span class="checkmark">Anual</span>
                    </label>
                </div>
                <input class = "cuerpo-form__Submit" type="submit" value="Siguiente">
            </form>
        </div>  
    `;
        
        container.innerHTML = contenido;
        const modeloSelect = document.getElementById('marca');
        const anioSelect = document.getElementById('anio');
        modeloSelect.addEventListener('change', function() {
            const selectedModelo = modeloSelect.value;
            const aniosDisponibles = obtenerAniosDisponiblesPorModelo(selectedModelo);
            // Vaciar las opciones actuales del campo de año
            anioSelect.innerHTML = '';
            // Agregar la opción por defecto (disabled y selected)
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione un año';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            anioSelect.appendChild(defaultOption);
            // Agregar las opciones de años disponibles
            aniosDisponibles.forEach(anio => {
            const option = document.createElement('option');
                    option.value = anio;
                    option.textContent = anio;
                    anioSelect.appendChild(option);
            });
        });
        //Se le da click a enviar
        const formParte1 = document.querySelector('.cuerpo-form');
        formParte1.addEventListener('submit', async (event) => {
            event.preventDefault();
            const propietario = JSON.parse(sessionStorage.getItem('user'));
            const vehiculo = Object.fromEntries( ((new FormData(formParte1))).entries());
            plazo = vehiculo.opcion;
            delete vehiculo.opcion;
            vehiculo.idPropietario = propietario.id;
            vehiculo.modelo = modelos.find((m) => m.anio === vehiculo.anio && m.modelo === vehiculo.modelo);;
            //Se envia al backend
            const request = new Request(backend + "/vehiculos", 
            {method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(vehiculo)
            });
                (async () => {
                    const response = await fetch(request);

                    if (!response.ok) {
                        alert(response.status+" Error en la solicitud");
                        return;
                    }

                    const existe = await response.json();
                    existe ? alert("Placa en el sistema"): (vehiculoConst = vehiculo) && getCoberturas();
            })();

        });
        

};
const obtenerAniosDisponiblesPorModelo = (selectedModelo) => {
  const aniosDisponibles = modelos.filter(modelo => modelo.modelo === selectedModelo).map(modelo => modelo.anio);
  return Array.from(new Set(aniosDisponibles));
};


const generaParte2 = () => {
    //Aqui se seleccionan las coberturas en base a esto vamos a crear una poliza.
    const contenido = `
    <div class = "cuerpo_cobertura">
            <form class = "cuerpo-form_cobertura">
                <h2 class = "cuerpo-form__titulo_cobertura"> Seleccione una o más coberturas </h2>
                <table class = "cuerpo-form__table_cobertura">
                    <tbody class = "cuerpo-form__table-cuerpo_cobertura" > 
                        ${coberturas.map((cobertura)=> `
                            <tr class = "tableRow_cobertura">
                                <td> <input class = "cuerpo-form__input_cobertura" type="checkbox" name="coberturas" value="${cobertura.id}"> </td>
                                <td> <span class = "cuerpo-form__info_cobertura"> ${cobertura.id} - ${cobertura.descripcion} </span> </td>
                            </tr>
                        `).join('')}
                        
                    </tbody>
                </table>
                <input class = "cuerpo-form__submit_cobertura" type="submit" value="Guardar">
            </form>
        </div>
`;
    container.innerHTML = contenido;
    const formCobertura = document.querySelector('.cuerpo-form_cobertura');
    formCobertura.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkboxes = formCobertura.querySelectorAll('input[type="checkbox"]:checked');
        selectedCoberturas = Array.from(checkboxes).map(checkbox => {
            const coberturaId = checkbox.value;
            return coberturas.filter(cobertura => cobertura.id === coberturaId)[0];
        });
        if (selectedCoberturas.length === 0) {
            alert('Debe seleccionar al menos una cobertura.');
            return;
        }
        getPrice();
    });
    
};

const generaParte3 = () =>{
    
    
    const contenido = `
    <div class = "cuerpo_final">
            <div class = "cuerpo-fondo_final">
                <h1 class = "cuerpo-titulo_final">Si está de acuerdo seleccione un metodo de pago</h1>
                <table class = "cuerpo-table_final">
                    <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${poliza.coberturas.map((cobertura) => `
                            <tr>
                                <td>${cobertura.descripcion}</td>
                                ${((poliza.vehiculo.valor) * (cobertura.costoPorcentual / 100.0)) > cobertura.costoMinimo ? `<td>${((poliza.vehiculo.valor) * (cobertura.costoPorcentual / 100.0)).toFixed(2)}</td>` :
                                    `<td>${cobertura.costoMinimo}</td>`
                                }
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div> 
                    <span class = "cuerpo-table__span_final">Total: ${poliza.valorSeguro}</span>
                    <span class = "cuerpo-table__span_final">Plazo de pago ${plazo}</span>
                </div>
                <form class = "cuerpo-form_final">
                    <label class = "form-label_final" for="metodoPago">Método de pago:</label>
                    <select class = "form-input_final" id="metodoPago" name="metodoPago" required>
                        <option value="" selected disabled>Seleccione un método de pago</option>
                        <option value="acepta">
                          1111
                        </option>
                    </select>
                    <input class = "form-submit_final" type="submit" value="Aceptar"/>
                    <a class = "form-cancelar_final" href="/Frontend_Proyecto2/presentation/">Cancelar</a>
                </form>
            </div>
        </div>
    `;
    container.innerHTML = contenido;
    const formCobertura = document.querySelector('.cuerpo-form_final');
    formCobertura.addEventListener('submit', (e) => {
        e.preventDefault();
        //Significa que aceptó 
        const request = new Request(backend + "/polizas/add",
                {method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(poliza)
                });
        (async () => {
            const response = await fetch(request);

            if (!response.ok) {
                alert(response.status + " Error en la compra de poliza");
                return;
            }
            alert('Poliza comprada de forma exitosa');
            window.location.href = '/Frontend_Proyecto2/presentation/cliente/miCuenta';
            setTimeout(function () {
                window.location.reload();
            }, 100);
        })();
    });
};
    
const getPrice = async () => {
    //Aqui lo que se hace es hacer una request al servidor para actualizar el precio de la poliza y se muestran los datos de esto
    //Se hace una request al servidor por motivos de seguridad para hacer el calculo del precio de ese lado.
    //Despu[es de esto si el cliente acepta se envia la poliza y se guarda.
    console.log(vehiculoConst);
    poliza.codigo = vehiculoConst.numPlaca + vehiculoConst.idPropietario;
    poliza.valorSeguro = 0.0;
    poliza.plazoPagos = plazo;
    poliza.fechaInicioVigencia = "";
    poliza.coberturas = selectedCoberturas;
    poliza.vehiculo = vehiculoConst;
    console.log(poliza);
    const request = new Request(backend+"/polizas",
    {method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(poliza) 
    });
    //se hace la request 
    (async () => {
        const response = await fetch(request);
        
        if (!response.ok) {
            alert(response.status + " Error en la solicitud");
            return;
        }
        
        poliza = await response.json();
        getDataCliente();
        generaParte3();
    })();
};

const getDataCliente = () => {
    const request = new Request(backend + "/login", {method: 'GET', headers: {'Content-Type': 'application/json'}});

    (async ()=> {
        const response = await fetch(request);

        if (!response.ok) {
            errorMessage(response.status);
            return;
        }

        cliente = await response.json();
        console.log(cliente);
    })(); 
};

const getCoberturas = async () => {
    const request = new Request(backend + "/coberturas", {method: 'GET', headers: {'Content-Type': 'application/json'}});
    (async () => {
        const response = await fetch(request);

        if (!response.ok) {
            alert(response.status + " Error en la solicitud");
            return;
        }

        coberturas = await response.json();
        console.log(coberturas);
        generaParte2();
    })();
};
const getModelos = async () => {
        //Request para traer una array de modelos
        const request = new Request(backend + "/modelos", {method: 'GET', headers: {'Content-Type': 'application/json'}});
        (async ()=> {
            const response = await fetch(request);

            if (!response.ok) {
                alert(response.status+" Error en la solicitud");
                return;
            }

            modelos = await response.json();
            modelos.forEach(modelo => {
                const modeloKey = modelo.modelo;
                hashModelos[modeloKey] = modelo;
            });
            console.log(hashModelos);
            generaParte1();
    })();
        
};

document.addEventListener('DOMContentLoaded', function () {
    container = document.getElementsByClassName('container')[0];
    getModelos();
});