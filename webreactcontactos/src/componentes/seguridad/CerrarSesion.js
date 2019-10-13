import React, {Component} from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios';

class CerrarSesion extends Component{
  constructor(props){
    super(props);
    localStorage.removeItem("token");
    this.Salir();
  }
  Salir()
  {
    axios.post('https://localhost:44328/api/Usuarios/CerrarSesion').then((response)=>{
        window.location.href='/';
      });
  }
}

export default CerrarSesion;
