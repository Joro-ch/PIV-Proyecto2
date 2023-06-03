/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

class modelos{
    modelos;
    marcas;
    constructor(){
        this.getModelos();
    }
    
    getModelos(){
        //Request para traer una array de modelos
        const request = new Request(backend + "/modelos", {method: 'GET', headers: {'Content-Type': 'application/json'}});
        (async ()=> {
        const response = await fetch(request);

        if (!response.ok) {
            alert(response.status+" Error en la solicitud");
            return;
        }

        this.modelos = await response.json();
        console.log(this.modelos)
        this.getMarcas();
    })();
        
    }
    
    getMarcas(){
        const request = new Request(backend + "/marcas", {method: 'GET', headers: {'Content-Type': 'application/json'}});
        (async ()=> {
        const response = await fetch(request);

        if (!response.ok) {
            alert(response.status+" Error en la solicitud");
            return;
        }
        
        this.marcas = await response.json();
        this.renderModelos();
    })();
    }
    
    renderModelos(){
        const content = `
            <div class = "fondo">
            <div class = "cuerpo">
                <button type="submit" id = "agregar" class = "form_Boton">Agregar</button>
                <table>
                        <thead>
                                <tr>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Año</th>
                                        <th>Imagen</th>
                                </tr>
                        </thead>
                        <tbody>
                            ${this.modelos.map((modelo) => `
                                <tr>
                                  <td>${modelo.marca}</td>
                                  <td>${modelo.modelo}</td>
                                  <td>${modelo.anio}</td>
                                  <td>
                                    <img src="data:image/jpg;base64,${modelo.imagenBase64}" alt="My Image">
                                  </td>
                                </tr>
                              `).join('')}                              
                        </tbody>
                </table>
            </div>
        </div>
        
         <div id="myModal" class="modal">
            <div class="modal-content">
              <div class="tab">
                <button class="tablinks active" id="modelTab">Model</button>
                <button class="tablinks" id="brandTab">Brand</button>
              </div>

              <div id="modelContent" class="tabcontent show" >
                <form id="modeloForm">
                    <label for="brand">Marca:</label>
                    <select id="brand" name="marca" required>
                    ${this.marcas.map((marca) => `
                        <option value="${marca}">${marca}</option>
                    `                
                    ).join('')
                    }
                    </select>
                    <label for="model">Modelo:</label>
                    <input type="text" id="model" name="modelo" required>
                    <label for="year">Año: </label>
                    <input type="text" id="year" name="anio" required>
                    <label for="image">Imagen(JPG):</label>
                    <input type="file" id="image" name="imagen" accept="image/jpeg" required>
                    <input type="submit" value="Aceptar">
                </form>
              </div>

              <div id="brandContent" class="tabcontent">
                <form id="brandForm">
                  <label for="brandName">Brand Name:</label>
                  <input type="text" id="brandName" name="marca" required>
                  <input type="submit" value="Aceptar">
                </form>
              </div>
            </div>
    </div>
        `;
        
        const data = document.createElement('div');
        data.classList.add('container');
        data.innerHTML = content;
        document.body.appendChild(data);
        
        let agregar = document.getElementById('agregar');
        let modal = document.getElementById('myModal');
        agregar.addEventListener('click', ()=>{
            modal.classList.add('show');
        });
        window.addEventListener("mousedown", function (event) {
            var targetElement = event.target;

            // Comprobar si el clic ocurrió dentro del modal o sus elementos hijos
            var isClickInsideModal = modal.contains(targetElement);

            // Si el clic ocurrió fuera del modal, cerrarlo
            if (!isClickInsideModal) {
                modal.classList.remove("show");
            }
        });
        var formMarca = document.getElementById('brandForm');
        var formModelo = document.getElementById('modeloForm');
        const modelTab = document.getElementById("modelTab");
        const brandTab = document.getElementById("brandTab");
        const modeloForm = document.getElementById("modeloForm");
        const brandForm = document.getElementById("brandForm");

        // Add click event listeners to the tab buttons
        modelTab.addEventListener("click", () => {
            modelTab.classList.add("active");
            brandTab.classList.remove("active");
            document.getElementById("modelContent").classList.add("show");
            document.getElementById("brandContent").classList.remove("show");
        });

        brandTab.addEventListener("click", () => {
            brandTab.classList.add("active");
            modelTab.classList.remove("active");
            document.getElementById("brandContent").classList.add("show");
            document.getElementById("modelContent").classList.remove("show");
        });

        // Prevent default form submission and handle form data
        modeloForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(document.getElementById("modeloForm"));

            try {
                const response = await fetch(backend + "/modelos", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    // La solicitud se realizó correctamente
                    alert("La solicitud se ha procesado exitosamente.");
                    window.location.reload();
                } else {
                    // Hubo un error en la solicitud
                    // Manejar el error según sea necesario
                    alert("Hubo un error en la solicitud.");
                }
            } catch (error) {
                // Hubo un error de red u otro tipo de error
                // Manejar el error según sea necesario
            }
        });




        brandForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(brandForm);

            const jsonData = {};
            for (let [key, value] of formData.entries()) {
                jsonData[key] = value;
            }
            console.log(jsonData);
            try {
                const response = await fetch(backend+"/marcas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                });

                if (response.ok) {
                    // La solicitud se realizó correctamente
                    alert("La solicitud se ha procesado exitosamente.");
                    window.location.reload();
                } else {
                    // Hubo un error en la solicitud
                    // Manejar el error según sea necesario
                    alert("Hubo un error en la solicitud.");
                }
            } catch (error) {
                // Hubo un error de red u otro tipo de error
                // Manejar el error según sea necesario
                alert("Hubo un error en la solicitud.");
            }
        });

        
    }
    
    
    

}
document.addEventListener('DOMContentLoaded', function() {
    var dataModelos = new modelos();
    
});

