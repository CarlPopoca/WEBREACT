import React, {Component} from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import AlertaError from '../../componentes/AlertaError';

class CerrarSesion extends Component{
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      alert_message:'',
      loggedIn
    }
    this.Salir();
  }
  Salir()
  {
    axios.post('https://localhost:44328/api/Usuarios/CerrarSesion').then((response)=>{
          localStorage.removeItem("token");
          this.setState({
            loggedIn: false
          });
      }).catch(error=>{

          this.setState({
            alert_message: 'Hubo un error al cerrar la sesión'
          });
        });
 }
  render(){
      // this.props.history.push("/")
      if (!this.state.loggedIn)
      return <Redirect  to="/" />
      //  window.location.href='/';
      return (
        <div id="cover-caption">
          <hr/>
            {this.state.alert_message!=""?<AlertaError mensaje={this.state.alert_message} />:null}
        </div>
      )
  }
}

export default CerrarSesion;
