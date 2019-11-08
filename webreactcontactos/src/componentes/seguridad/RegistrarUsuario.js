import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import axios from  'axios';
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
      loggedIn,
      isNullEmail: '',
      isNullPassword: '',
      isNullComfirmPassword: ''
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
        alert_message: '',
        datosUsuario: {
          Email: '',
          Password: '',
          ConfirmPassword: ''
            }
        });
      }).catch(error=>{
          this.setState({
            alert_message: 'El usuario no pudo ingresar'
          });
    });
  }

   validacionControles() {
     if (this.state.datosUsuario.Email=='' && this.state.datosUsuario.Password=='' && this.state.datosUsuario.ConfirmPassword=='')
     {
       this.setState({
         alert_message: 'Introduzca los datos que se le solicitan',
         isNullEmail: 'true',
         isNullPassword: 'true',
         isNullComfirmPassword: 'true'
       });
       return false;
     }

     if (this.state.datosUsuario.Password.length < 10)
     {
       this.setState({
         alert_message: 'El password debe tener diez caracteres',
         isNullPassword: 'true',
       });
        return false;
     }
    if (this.state.datosUsuario.ConfirmPassword.length < 10)
    {
      this.setState({
        alert_message: 'La confirmación del password debe tener diez caracteres',
        isNullComfirmPassword: 'true',
      });
       return false;
    }
    if (this.state.datosUsuario.Password != this.state.datosUsuario.ConfirmPassword)
    {
      this.setState({
        alert_message: 'El password y la confirmación del password deben ser indenticos',
        isNullPassword: 'true',
        isNullComfirmPassword: 'true'
      });
      return false;
    }
     return true;
  }

  submitForm()
  {
    let valControles = this.validacionControles();
    if (valControles){
          axios.post('https://localhost:44328/api/Usuarios/Registrar', this.state.datosUsuario).then((response)=>{
          this.ingresoUsuario();
        }).catch(error=>{
            this.setState({
              alert_message: 'No se pudo registrar el usuario'
            });
      });
    }
}

validacionBoton(e){
  if (e == 'true'){
    return 'red-icon'
  }
  if (e == 'false'){
    return 'green-icon'
  }
  return '';
}

render(){
  if (this.state.loggedIn===true){
    //Otra forma de hacer redirect
    // this.props.history.push("/")
    return <Redirect  to="/" />
  }
  return (
    <div id="cover-caption">
        {this.state.alert_message!=""?<AlertaError mensaje={this.state.alert_message} />:null}
        <div id="container" className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-4 text-center">
                    <h1 className="col-sm-7 display-5  my-4">Registrar</h1>
                    <div className="info-form col-sm-7">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text bg-white">
                                  <i className= {this.validacionBoton(this.state.isNullEmail)}>  <FontAwesomeIcon className="mr-1" icon="user-circle" /></i>
                                </div>
                              </div>
                              <input type="email" className="form-control" type= "text" placeholder="Usuario" name="nombreUsuario" value={this.state.datosUsuario.Email} onChange={(e)=>{
                                let {datosUsuario} = this.state;
                                datosUsuario.Email = e.target.value;
                                this.setState({datosUsuario});
                              }} required="true"
                              onBlur={(e)=>{
                                let {isNullEmail} = this.state;
                                if (e.target.value == '')
                                  {
                                    this.setState({isNullEmail: 'true'});
                                  }else {
                                    this.setState({isNullEmail: 'false', alert_message: ''});
                                  }
                                }} />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                               <div className="input-group-prepend">
                                 <div className="input-group-text bg-white">
                                   <i className= {this.validacionBoton(this.state.isNullPassword)}>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                 </div>
                               </div>
                                <input className="form-control" type= "password" placeholder="Password" name="password" value={this.state.datosUsuario.Password} onChange={(e)=>{
                                  let {datosUsuario} = this.state;
                                  datosUsuario.Password = e.target.value;
                                  this.setState({datosUsuario});
                                }}  required="true" maxlength="10" minlength="10"
                                onBlur={(e)=>{
                                  let {isNullPassword} = this.state;
                                  if (e.target.value == '')
                                    {
                                      this.setState({isNullPassword: 'true'});
                                    }else {
                                      this.setState({isNullPassword: 'false', alert_message: ''});
                                    }
                                  }}/>
                              </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                               <div className="input-group-prepend">
                                 <div className="input-group-text bg-white">
                                   <i className= {this.validacionBoton(this.state.isNullComfirmPassword)}>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                 </div>
                               </div>
                                <input className="form-control" type= "password" placeholder="Confirmar password" name="confirmarPassword" value={this.state.datosUsuario.ConfirmPassword} onChange={(e)=>{
                                  let {datosUsuario} = this.state;
                                  datosUsuario.ConfirmPassword = e.target.value;
                                  this.setState({datosUsuario});
                                }}  required="true" maxlength="10" minlength="10"
                                onBlur={(e)=>{
                                  let {isNullComfirmPassword} = this.state;
                                  if (e.target.value == '')
                                    {
                                      this.setState({isNullComfirmPassword: 'true'});
                                    }else {
                                      this.setState({isNullComfirmPassword: 'false', alert_message: ''});
                                    }
                                  }}/>
                              </div>
                            </div>
                            <div className="form-group">
                                 <button className="btn btn-success" onClick={this.submitForm.bind(this)}>
                                   <FontAwesomeIcon className="mr-1" icon="database" />
                                   Guardar</button>
                            </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
}

export default RegistrarUsuario;
