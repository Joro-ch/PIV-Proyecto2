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
var poliza;
const generaParte1 = () => {
    const contenido = `
          <div class = "cuerpo">
            <form class = "cuerpo-form">
                <h1 class = "cuerpo-form__titulo"> Póliza </h1>

                <i class="fas fa-hashtag cuerpo-form__icon cuerpo-form__item"></i>
                <input class = "cuerpo-form__input cuerpo-form__item" autocomplete="off" type = "text" id = "id" placeholder="Ingrese la Placa" name="numPlaca" required>    
                <i class="fas fa-car cuerpo-form__icon cuerpo-form__item"></i>
                <select class="cuerpo-form__item cuerpo-form__input" id="marca" name="modelo" required>
                    <option value="" disabled selected>Seleccione un modelo</option>
                    ${Object.entries(hashModelos).map(([modelo, objetoModelo]) => `
                        <option value="${modelo}">${modelo}</option>
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
            <div class="errores-container">
                    <div class="error-message <%=erroneo("anio_null",errores)%>"> <%= title("anio_null",errores)%></div>
                    <div class="error-message <%=erroneo("placa",errores)%>"> <%= title("placa",errores)%></div>
                    
            </div>
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
                    existe ? alert("Placa en el sistema"): (vehiculoConst = vehiculo) && generaParte2();
            })();

        });
        

};
const obtenerAniosDisponiblesPorModelo = (selectedModelo) => {
  const aniosDisponibles = modelos.filter(modelo => modelo.modelo === selectedModelo).map(modelo => modelo.anio);
  return Array.from(new Set(aniosDisponibles));
};


const generaParte2 = () => {
    //Aqui se seleccionan las coberturas en base a esto vamos a crear una poliza. 
};


const getCoberturas = async () => {
    
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
            console.log(this.modelos);
            generaParte1();
    })();
        
};

document.addEventListener('DOMContentLoaded', function () {
    container = document.getElementsByClassName('container')[0];
    getModelos();
});