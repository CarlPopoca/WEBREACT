import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
 import { withRouter } from 'react-router';
 import axios from 'axios';
 import AlertaSatisfactoria from '../../componentes/AlertaSatisfactoria';
 import AlertaError from '../../componentes/AlertaError';
/*import Navegacion from '../../componentes/Navegacion';*/

class Ingresar extends Component{
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      alert_message:'',
      datosUsuario: {
        Email: '',
        Password: '',
        RemenberMe: false
      },
      loggedIn
    }

  }

  /*onChange(e){
    this.setState({
      datosUsuario:[e.target.name]: e.target.value
    })
  }*/
  submitForm()
  {

      axios.post('https://localhost:44328/api/Usuarios/Ingresar', this.state.datosUsuario).then((response)=>{
        //Se genera el token
        localStorage.setItem("token", "jasdajalkcecklwcljekwej");
        //Se setea que ingreso
        this.setState({
          loggedIn: true,
          alert_message: 'Acceso satisfactorio'
        });
        //Se inicializan la variable editarContactoModal y el objeto de datosEditarContacto
        this.setState({datosUsuario: {
          Email: '',
          Password: '',
          RemenberMe: false
            }});
        }).catch(error=>{
            this.setState({
              alert_message: 'Credenciales incorrectas'
            });
      });

    //La llamada al servicio
    /*if (nombreUsuario==="A" && password==="B"){

      localStorage.setItem("token", "jasdajalkcecklwcljekwej");
      this.setState({
        loggedIn: true
      })
    }*/
}

  render(){
    if (this.state.loggedIn===true){
      //Otra forma de hacer redirect
      // this.props.history.push("/")
      //return <Redirect  to="/" />
      window.location.href='/';

    }
    return (

      <div id="cover-caption">
        <hr/>
          {this.state.alert_message=="Credenciales incorrectas"?<AlertaError mensaje={this.state.alert_message} />:null}
          <div id="container" class="container">

              <div class="row">
                  <div class="col-sm-10 offset-sm-1 text-center">
                      <h1 class="display-5  my-5">Login</h1>
                      <div class="info-form">


                          <div class="form-group">
                            <label htmlFor="Email">Usuario: </label>
                          <input type= "text" placeholder="Usuario" name="Email" value={this.state.datosUsuario.Email} onChange={(e)=>{
                            let {datosUsuario} = this.state;
                            datosUsuario.Email = e.target.value;
                            this.setState({datosUsuario});
                          }} required="true"/>
                          </div>

                        <div class="form-group">
                          <label htmlFor="Password">Password: </label>
                        <input  type= "password" placeholder="Password" name="Password" value={this.state.datosUsuario.Password} onChange={(e)=>{
                            let {datosUsuario} = this.state;
                            datosUsuario.Password = e.target.value;
                            this.setState({datosUsuario});
                          }}  required="true"/>
                        </div>

                        <div class="form-group">
                          <label htmlFor="RemenberMe">Recordar sesión: </label>
                         <input  type="checkbox"  name="RemenberMe" value={this.state.datosUsuario.RemenberMe} onChange={(e)=>{
                             let {datosUsuario} = this.state;
                             datosUsuario.RemenberMe = e.target.value;
                             this.setState({datosUsuario});
                         }}/>
                       </div>

                       <button class="btn btn-success" onClick={this.submitForm.bind(this)}>Ingresar</button>


                    </div>
                  </div>
    </div>
  </div>
</div>

    )
  }
}

export default Ingresar;
