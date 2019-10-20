import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
 import { withRouter } from 'react-router';
import axios from  'axios';
 import AlertaSatisfactoria from '../../componentes/AlertaSatisfactoria';
 import AlertaError from '../../componentes/AlertaError';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RegistrarUsuario extends Component{
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
        ConfirmPassword: ''
      },
      loggedIn
    }
  }
  ingresoUsuario()
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
        ConfirmPassword: ''
          }});
        });
  }
  submitForm()
  {
    //const {nombreUsuario, password}  = this.state;

      axios.post('https://localhost:44328/api/Usuarios/Registrar', this.state.datosUsuario).then((response)=>{

      //Se refresca el Table
      this.ingresoUsuario();
      //Se inicializan la variable editarContactoModal y el objeto de datosEditarContacto

    }).catch(error=>{
        this.setState({
          alert_message: 'Credenciales incorrectas'
        });
  });

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
                  <div class="col-sm-6 offset-sm-4 text-center">
                      <h1 class="col-sm-6 display-5  my-4">Registrar</h1>
                      <div class="info-form">
                          <form action="" class="form-inlin justify-content-center">

                            <div class="form-group">
                              <div class="input-group">
                                <div class="input-group-prepend">
                                  <div class="input-group-text bg-white">

                                    <i>  <FontAwesomeIcon className="mr-1" icon="user-circle" /></i>
                                  </div>
                                </div>
                                <input type= "text" placeholder="Usuario" name="nombreUsuario" value={this.state.datosUsuario.Email} onChange={(e)=>{
                                  let {datosUsuario} = this.state;
                                  datosUsuario.Email = e.target.value;
                                  this.setState({datosUsuario});
                                }} required="true" />
                              </div>
                            </div>

                            <div class="form-group">
                              <div class="input-group">
                                 <div class="input-group-prepend">
                                   <div class="input-group-text bg-white">
                                     <i>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                   </div>
                                 </div>
                                  <input  type= "password" placeholder="Password" name="password" value={this.state.datosUsuario.Password} onChange={(e)=>{
                                    let {datosUsuario} = this.state;
                                    datosUsuario.Password = e.target.value;
                                    this.setState({datosUsuario});
                                  }}  required="true" maxlength="10" minlength="10"/>
                                </div>
                            </div>

                            <div class="form-group">
                              <div class="input-group">
                                 <div class="input-group-prepend">
                                   <div class="input-group-text bg-white">
                                     <i>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                   </div>
                                 </div>
                                  <input  type= "password" placeholder="Confirmar password" name="confirmarPassword" value={this.state.datosUsuario.ConfirmPassword} onChange={(e)=>{
                                    let {datosUsuario} = this.state;
                                    datosUsuario.ConfirmPassword = e.target.value;
                                    this.setState({datosUsuario});
                                  }}  required="true" maxlength="10" minlength="10"/>
                                </div>
                              </div>
                              <div class="form-group">
                                 <div class="col-sm-6">
                                   <button class="btn btn-success" onClick={this.submitForm.bind(this)}>
                                     <FontAwesomeIcon className="mr-1" icon="database" />
                                     Guardar</button>
                                </div>
                              </div>
                          </form>
                        </div>
                  </div>
    </div>
  </div>
</div>

    )
  }
}

export default RegistrarUsuario;
