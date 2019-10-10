import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
/*import Navegacion from '../../componentes/Navegacion';*/

export default class Registrar extends Component{
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      nombreUsuario: '',
      password: '',
      loggedIn
    }
    //Se setea al método onChange los eventos de onChange de los Input
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitForm(e)
  {
    e.preventDefault();
    const {nombreUsuario, password}  = this.state;
    //La llamada al servicio
    if (nombreUsuario==="A" && password==="B"){
      localStorage.setItem("token", "jasdajalkcecklwcljekwej");
      this.setState({
        ingreso: true
      })
    }
}
  render(){
    if (this.state.ingreso===true){
      return <Redirect to="/"/>
    }
    return (

      <div id="divRegistrarUsuario">

          <div id="container" class="container">
              <div class="row">
                  <div class="col-sm-10 offset-sm-1 text-center">
                      <h1 class="display-5  my-5">Registrar</h1>
                      <div class="info-form">

                        <form onSubmit={this.submitForm} class="justify-content-center">
                          <div class="form-group">
                            <label htmlFor="nombreUsuario">Usuario: </label>
                          <input type= "text" placeholder="Usuario" name="nombreUsuario" value={this.state.nombreUsuario} onChange={this.onChange} required="true"/>
                          </div>

                        <div class="form-group">
                          <label htmlFor="password">Password: </label>
                          <input  type= "password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} required="true"/>
                        </div>

                          <button type="submit" class="btn btn-success">Ingresar</button>
                        </form>

                    </div>
                  </div>
    </div>
  </div>
</div>

    )
  }
}
