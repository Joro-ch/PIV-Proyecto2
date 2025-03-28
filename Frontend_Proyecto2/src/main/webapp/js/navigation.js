class Usuario {
    constructor(id, tipo) {
        this.id = id;
        this.tipo = tipo;
    }

    getId() {
        return this.id;
    }

    getTipo() {
        return this.tipo;
    }
}

class Navigation {
    constructor() {
        const user = sessionStorage.getItem('user');
        if(user !==null){
            this.usuario = JSON.parse(sessionStorage.getItem('user'));
        }else{
            this.usuario = null;
        }
    }
    
    setUsuario(usuario) {
        this.usuario = usuario;
    }

    generateHeader() {
        const navLogo = `
            <div class="nav-logo">
                <a class="nav-logo__imagen" href="/Frontend_Proyecto2/presentation/">
                    <img src="/Frontend_Proyecto2/images/logo.png" alt="">
                </a>
                <a class="nav-logo__titulo" href="/Frontend_Proyecto2/presentation/">Seguros Infinitos</a>
            </div>
        `;

        const navMenuCliente = `
            <div class="nav-menu">
                <ul class="nav-menu__Items">
                    <li class="nav-menu__item"><a href="presentation/cliente/polizas/comprarPoliza">Comprar</a></li>
                    <li class="nav-menu__item"><a href="presentation/cliente/polizas/misPolizas">Mis Polizas</a></li>
                    <li class="nav-menu__item"><a href="/Frontend_Proyecto2/presentation/cliente/miCuenta">Mi Cuenta</a></li>
                </ul>
            </div>
        `;

        const navMenuAdmin = `
            <div class="nav-menu">
                <ul class="nav-menu__Items">
                    <li class="nav-menu__item"><a href="presentation/admin/clientes/listaClientes/">Listado Clientes y Pólizas</a></li>
                    <li class="nav-menu__item"><a href="presentation/admin/modelos/">Modelos y Marcas</a></li>
                    <li class="nav-menu__item"><a href="/Frontend_Proyecto2/presentation/admin/categorias/">Categorias y Coberturas</a></li>
                </ul>
            </div>
        `;
        
        let navUsuarioLogout = '';
        let navUsuarioLogin = '';
        
        if(this.usuario !== null){
            console.log("El usuario no es null");
            navUsuarioLogout = `
                <div class="nav-usuario">
                    <a id="logout-link" href=""><i class="fas fa-user"></i> Logout from ${this.usuario.id} </a>
                </div>
            `;
        }else{
            console.log("El usuario es null");
            navUsuarioLogin = `
            <div class="nav-usuario">
                <a href="presentation/login/"><i class="fas fa-user"></i> Login</a>
            </div>
        `;
        }

        const header = document.createElement('header');
        const nav = document.createElement('nav');

        header.appendChild(nav);

        if (this.usuario !== null && this.usuario.tipo === 1) {
            nav.innerHTML = navLogo + navMenuCliente + navUsuarioLogout;
        } else if (this.usuario !== null && this.usuario.tipo === 2) {
            nav.innerHTML = navLogo + navMenuAdmin + navUsuarioLogout;
        } else if (this.usuario === null) {
            nav.innerHTML = navLogo + navUsuarioLogin;
        }

        document.body.insertBefore(header, document.body.firstChild);
        
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
                logoutLink.addEventListener('click', function(event) {
                event.preventDefault();
                logout();
            });
        }
    }
    generateFooter() {
        const footer = document.createElement('footer');
        footer.classList.add('footer');
        footer.innerHTML = `
            <h5>Total Soft Inc. ©2023 Tsf, Inc.</h5>
        `;

        document.body.appendChild(footer);
    }
}
// Función de logout
async function logout() {
  try {
    sessionStorage.removeItem('user');

    // Realizar la petición DELETE
    const response = await fetch(`${backend}/login`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Redirigir a la página de inicio de sesión
      window.location.href = '/Frontend_Proyecto2/presentation/';
    } else {
      console.error('No se pudo realizar el logout.');
    }
  } catch (error) {
    console.error('Error al realizar el logout:', error);
  }
}

$(document).ready(function() {
  var headElements = '/Frontend_Proyecto2/presentation/Head.html';
  $.get(headElements, function(data) {
    $('head').append(data);
  });
});

document.addEventListener("DOMContentLoaded", function() {
    const navigation = new Navigation();
    navigation.generateHeader();
    navigation.generateFooter();
});
