import React, {Component} from 'react';
import { Link, Redirect} from 'react-router-dom';
/*import Navegacion from '../../componentes/Navegacion';*/

class CerrarSesion extends Component{
  constructor(props){
    super(props);
    localStorage.removeItem("token");
  }
  render (){
    return (
      <div id="divCerrarSesion">

        <div className="App container">
          <h1>Ha salido</h1>
        <a class="nav-link text-blue" href="/">Intentelo de nuevo</a>
        </div>
      </div>
    )
  }
}

export default CerrarSesion;
