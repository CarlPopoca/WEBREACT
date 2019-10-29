import React, {Component, Fragment }  from 'react';
import ReactDOM from 'react-dom';

class Navegacion extends Component  {
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      loggedIn
    }
  }

  render(){
     if(this.state.loggedIn===true)
     {
      var letLogout = (
             <Fragment>
             <li class="nav-item">
                 <a class="nav-link text-dark" href="/cerrarSesion">Logout</a>
             </li>
              </Fragment>
            )
          }
      else  {
              var letLogin = (
                     <Fragment>
                     <li class="nav-item">
                         <a class="nav-link text-dark" href="/ingresar">Ingresar</a>
                     </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/registrarUsuario">Registrar</a>
                    </li>
                      </Fragment>
                    )
     }

      return (
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand"  href="/">Aplicación de Contactos</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse">

                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/contactos">Contactos</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">

                  {letLogout}{letLogin}
                   </ul>

                </div>
            </div>
        </nav>
      );
  }
}

export default Navegacion;
