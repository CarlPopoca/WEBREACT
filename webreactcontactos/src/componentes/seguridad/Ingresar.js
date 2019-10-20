import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
 import { withRouter } from 'react-router';
 import axios from 'axios';
 import AlertaSatisfactoria from '../../componentes/AlertaSatisfactoria';
 import AlertaError from '../../componentes/AlertaError';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      loggedIn,
      isNullEmail: true,
      isNullPassword: true
    }
  }
  validacionControles() {
    if (this.state.datosUsuario.Email=='' && this.state.datosUsuario.Password=='')
    {
      this.setState({
        alert_message: 'Introduzca el usuario y el password',
        isNullEmail: true,
        isNullPassword: true
      });
      return false;
    }
    if (this.state.datosUsuario.Password.length < 10)
    {
      this.setState({
        alert_message: 'El password debe tener diez caracteres',
        isNullPassword: true,
      });
       return false;
    }
    return  true;
  }

  submitForm()
  {

    let valControles = this.validacionControles();
    if (valControles){
      axios.post('https://localhost:44328/api/Usuarios/Ingresar', this.state.datosUsuario).then((response)=>{
        //Se genera el token
        localStorage.setItem("token", "jasdajalkcecklwcljekwej");
        //Se setea que ingreso
        this.setState({
          loggedIn: true,
          alert_message: ''
        });
        //Se inicializan la variable editarContactoModal y el objeto de datosEditarContacto
        this.setState({datosUsuario: {
          Email: '',
          Password: '',
          RemenberMe: false
            }});
        }).catch(error=>{
          alert ('error');
            this.setState({
              alert_message: 'Credenciales incorrectas'
            });
      });
    }

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
          {this.state.alert_message!=""?<AlertaError mensaje={this.state.alert_message} />:null}
          <div id="container" className="container">

              <div className="row">
                  <div className="col-sm-6 offset-sm-4 text-center">
                      <h1 className="col-sm-6 display-5  my-4">Login</h1>
                      <div className="info-form ">

                            <div className="form-group">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <div className="input-group-text bg-white">

                                    <i className= {(this.state.isNullEmail?'red-icon':'green-icon')}>  <FontAwesomeIcon className="mr-1" icon="user-circle" /></i>
                                  </div>
                                </div>

                                <input type= "text" placeholder="Usuario" name="Email" value={this.state.datosUsuario.Email} onChange={(e)=>{
                                    let {datosUsuario} = this.state;
                                    datosUsuario.Email = e.target.value;
                                    this.setState({datosUsuario});
                                  }} required="true" onBlur={(e)=>{
                                    let {isNullEmail} = this.state;
                                    if (e.target.value == '')
                                      {
                                        this.setState({isNullEmail: true});
                                      }else {
                                        this.setState({isNullEmail: false, alert_message: ''});
                                      }
                                    }}/>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                               <div className="input-group-prepend">
                                 <div className="input-group-text bg-white">
                                   <i className= {(this.state.isNullPassword?'red-icon':'green-icon')}>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                 </div>
                               </div>
                                <input  type= "password" placeholder="Password" name="Password" value={this.state.datosUsuario.Password} onChange={(e)=>{
                                    let {datosUsuario} = this.state;
                                    datosUsuario.Password = e.target.value;
                                    this.setState({datosUsuario});
                                  }}  required="true" maxlength="10" minlength="10" onBlur={(e)=>{
                                    let {isNullPassword} = this.state;
                                    if (e.target.value == '')
                                      {
                                        this.setState({isNullPassword: true});
                                      }else {
                                        this.setState({isNullPassword: false, alert_message: ''});
                                      }
                                    }}/>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                              <div className="form-check">

                                <input type="checkbox" name="RemenberMe"
                                   className="form-check-input" value={this.state.datosUsuario.RemenberMe} onChange={(e)=>{
                                       let {datosUsuario} = this.state;
                                       datosUsuario.RemenberMe = e.target.value;
                                       this.setState({datosUsuario});
                                   }}/>
                                   <label htmlFor="RemenberMe" className="form-check-label">Recordar sesión</label>
                              </div>
                          </div>
                        </div>
                         <div className="form-group">
                           <div className="col-sm-6">
                             <button className="btn btn-success" onClick={this.submitForm.bind(this)}>
                               <FontAwesomeIcon className="mr-2" icon="sign-in-alt" />
                               Ingresar</button>
                           </div>
                        </div>

                    </div>
                  </div>
                </div>
            </div>
        </div>
      )
    }
}

export default Ingresar;
