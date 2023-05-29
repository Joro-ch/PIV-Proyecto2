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
    constructor(usuario) {
        if(usuario instanceof Usuario){
            this.usuario = usuario;
        }
        else{
            this.usuario = null;
        }
    }
    
    setUsuario(usuario) {
        this.usuario = usuario;
    }

    generateHeader() {
        const navLogo = `
            <div class="nav-logo">
                <a class="nav-logo__imagen" href="/Proyectov1/Inicio">
                    <img src="/Proyectov1/images/logo.png" alt="">
                </a>
                <a class="nav-logo__titulo" href="/Proyectov1/Inicio">Seguros Infinitos</a>
            </div>
        `;

        const navMenuCliente = `
            <div class="nav-menu">
                <ul class="nav-menu__Items">
                    <li class="nav-menu__item"><a href="presentation/cliente/polizas/nuevaPoliza/show">Comprar</a></li>
                    <li class="nav-menu__item"><a href="presentation/cliente/polizas/misPolizas/show">Mis Polizas</a></li>
                    <li class="nav-menu__item"><a href="presentation/cliente/cuenta/miCuenta">Mi Cuenta</a></li>
                </ul>
            </div>
        `;

        const navMenuAdmin = `
            <div class="nav-menu">
                <ul class="nav-menu__Items">
                    <li class="nav-menu__item"><a href="presentation/admin/clientes/show">Listado Clientes y Pólizas</a></li>
                    <li class="nav-menu__item"><a href="presentation/admin/modelos/show">Modelos y Marcas</a></li>
                    <li class="nav-menu__item"><a href="presentation/admin/categorias/show">Categorias y Coberturas</a></li>
                </ul>
            </div>
        `;

        const navUsuarioLogin = `
            <div class="nav-usuario">
                <a href="presentation/login/"><i class="fas fa-user"></i> Login</a>
            </div>
        `;
        if(this.usuario !== null){
            const navUsuarioLogout = `
                <div class="nav-usuario">
                    <a href="presentation/login/logout"><i class="fas fa-user"></i> Logout from ${this.usuario.getId()} </a>
                </div>
            `;
        }

        const header = document.createElement('header');
        const nav = document.createElement('nav');

        header.appendChild(nav);

        if (this.usuario !== null && this.usuario.getTipo() === 1) {
            nav.innerHTML = navLogo + navMenuCliente + navUsuarioLogout;
        } else if (this.usuario !== null && this.usuario.getTipo() === 2) {
            nav.innerHTML = navLogo + navMenuAdmin + navUsuarioLogout;
        } else if (this.usuario === null) {
            nav.innerHTML = navLogo + navUsuarioLogin;
        }

        document.body.insertBefore(header, document.body.firstChild);
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
$(document).ready(function() {
  var headElements = '/Frontend_Proyecto2/presentation/Head.html';
  $.get(headElements, function(data) {
    $('head').append(data);
  });
});


