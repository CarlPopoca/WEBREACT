import React, {Component} from 'react';
import {Label, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertaError from './AlertaError';
import 'react-confirm-alert/src/react-confirm-alert.css';

/*import Navegacion from './Navegacion';*/
//Una Clase que extiende del component de React se comvierte en una etiqueta html
class Contactos extends Component  {

  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
    loading: false,
    contactos: [],
		isError:'',
		isNullNombre: '',
		isNullCelular: '',
		isNullSexo: '',
		alert_message:'',
		datosNuevoContacto: {
        Nombre: '',
        Celular: '',
        Sexo: ''
      },
      datosEditarContacto: {
        Id: '',
        Nombre: '',
        Celular: '',
        Sexo: ''
      },
      nuevoContactoModal: false,
      editarContactoModal: false,
      loggedIn
    }
  }
  //Se declara en el objeto state las variables que mantendran el valor
  //Contactos - Los datos que llenaran el Table
  //datosNuevoContacto - Los datos para la Alta
  //datosEditarContacto - Los datos para la modificación
  //nuevoContactoModal - Para la visualización y cierre de la ventana modal de Alta
 //editarContactoModal - Para la visualización  y cierre de la ventana modal de modificación

 //Método que refrescara el Table
  
  componentWillMount(){
    this.refrescarContactos();
  }
//Método que niega el valor de la variable nuevoContactoModal inicializada en false, esto
//permite mostrar el Modal para la Alta y inicializa los datos del objeto datosNuevoContacto, y
//Se regresa el valor de la variable nuevoContactoModal a false cuando se pulsa el botón de cerrar y
//cuando se pulsa el botón de cancelar
  toggleNuevoContactoModal() {
    this.setState({
	  isError:'',
      isNullNombre:'',
      isNullCelular:'',
      isNullSexo:'',
      alert_message:'',
	  nuevoContactoModal: !this.state.nuevoContactoModal,
      datosNuevoContacto: {
        Nombre: '',
        Celular: '',
        Sexo: ''
      }
    });
  }
  //Método que niega el valor de la variable editarContactoModal inicializada en false, esto
  //permite mostrar el Modal para la Modificación y
  //se regresa el valor de la variable editarContactoModal a false cuando se pulsa el botón de cerrar y
  //cuando se pulsa el botón de cancelar
  toggleEditarContactoModal() {
    //Este metodo se dispara cuando se cierra la ventana modal de editar, y cuando se pulsa el botón de Cancelar
    // convierte el valor de la variable editarContactoModal a false
  this.setState({
    editarContactoModal: !this.state.editarContactoModal
  });
}
validacionInput(e){

  if (e === 'true'){
    return {borderColor: '#dc3545'}
  }
  if (e === 'false'){
    return  {borderColor: '#28a745'}
  }
  return  {borderColor: 'none'};
}

validarContacto(contacto) {
  var nombre='false', celular='false', sexo='false', alert='', valAlert=false, valContacto= true;

  if (contacto.Nombre ==='')
  {
    nombre ='true';
    valAlert=true;
  }

  if (contacto.Celular ==='')
  {
    celular = 'true';
    valAlert=true;
  }

  if (contacto.Sexo ==='')
  {
    sexo = 'true';
    valAlert=true;
  }

  if (valAlert) {
    alert = 'Introduzca la información que se le solicita'
    valContacto = false;
  }
  this.setState({
    isError:'',
    isNullNombre: nombre,
    isNullCelular: celular,
    isNullSexo: sexo,
    alert_message: alert
  });

  return valContacto;
}
//Método que permite guardar los datos capturados en el modal de Alta
  agregarContacto (){
	if (this.validarContacto(this.state.datosNuevoContacto)) {
    this.setState({loading: true
    });
		axios.post('https://localhost:44386/api/Contactos', this.state.datosNuevoContacto).then((response)=>{
		//Se setea la variable de state contactos, los simbolo {} permiten usarla para setearla por medio de let
		//this.state contiene los contactos que se renderizaron en el Table
		  let {contactos} = this.state;
		  //Se agrega al final el contacto que devolvio el metodo post de la api contactos
		  contactos.push(response.data);
		  //Inicializa el estado de las variables nuevoContactoModal y el objeto datosNuevoContacto
		  this.setState({loading: false, contactos, nuevoContactoModal:false, datosNuevoContacto: {
			Nombre: '',
			Celular: '',
			Sexo: ''
		  }});
		}).catch(error=>{
        //entra cuando los errores se propagan desde la base de datos, por ejemplo cuando la logitud de un
        //  es superior al campo de la base de datos
        this.setState({
          loading: false,
          isError:'true',
          alert_message: 'No se pudo agregar el contacto'
        });
      });
	   }
  }

//Método que permite guardar los datos capturados en el modal de Modificación
  actualizarContacto()
  {
    let {Id, Nombre, Celular, Sexo} = this.state.datosEditarContacto;
	  if (this.validarContacto(this.state.datosEditarContacto)) {
      this.setState({
        loading: true
      });
		  axios.put('https://localhost:44386/api/Contactos/' + this.state.datosEditarContacto.Id, {
		  Id, Nombre, Celular, Sexo
			}).then((response)=>{
		  //Se refresca el Table
  		  this.refrescarContactos();
  		  //Se inicializan la variable editarContactoModal y el objeto de datosEditarContacto
  		  this.setState({loading: false, editarContactoModal: false, datosEditarContacto: {
  				Id: '',
  				Nombre: '',
  				Celular: '',
  				Sexo: ''
  			}});
		   }).catch(error=>{
        //entra cuando los errores se propagan desde la base de datos, por ejemplo cuando la logitud de un
        //  es superior al campo de la base de datos
        this.setState({
          loading: false,
          isError:'true',
          alert_message: 'No se pudo actualizar el contacto'
        });
      });
	  }
  }

//Método para eliminar un Contacto
 eliminarContacto(id){
   var item = false;
   confirmAlert({
    customUI:({ onClose }) => {
      var loading = false;
      return (
        <div className='custom-ui'>
          <h1 className="glyphicon glyphicon-warning-sign">
            <FontAwesomeIcon className="mr-3" icon="exclamation-triangle" />
            Esta seguro de eliminar el registro?</h1>
          <div className="btn-toolbar row" role="toolbar">
            <div className="col-sm-4"></div>
          <div className="btn-group col-sm-4">
              <Button color="secondary" size="sm" className="mr-3" onClick={onClose}>
                  <FontAwesomeIcon className="mr-2" icon="times" />
                  No
               </Button>
              <Button color="primary" size="sm" className="btn btn-default "
                onClick={() => {
                  item = true;
                  axios.delete('https://localhost:44386/api/Contactos/'+id).then((response)=>{
                  this.refrescarContactos();
                  onClose();  
            
                }).catch(error=>{
                  //entra cuando los errores se propagan desde la base de datos, por ejemplo cuando la logitud de un
                  //  es superior al campo de la base de datos
                    this.setState({
                      isError: 'true',
                      alert_message: 'No se pudo eliminar el contacto'
                    });
                  })
                }}
              >
                <FontAwesomeIcon className="mr-2" icon="check" />
                Si
              </Button>
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        );
      }
    });
 }
 refrescarContactos(){
    axios.get('https://localhost:44386/api/Contactos').then((response)=>{
      this.setState({
        contactos: response.data
      })
    }).catch(error=>{
      //entra cuando los errores se propagan desde la base de datos, por ejemplo cuando la logitud de un
      //  es superior al campo de la base de datos
      this.setState({
        alert_message: 'Error al obtener los contactos'
      });
    });
  }

  //Nota: this.state mantiene el estado de las variables, es como un get pero para setear una  variables
  // se debe ocupar
  //Método para actualizar los datos
  editarContacto (Id, Nombre, Celular, Sexo)
  {
    //Por default la variable editarContactoModal es false pero se niega este valor seteando a verdadero,
    // y de esta manera se consigue visualizar el modal de mdificación y setearle los datos a los controles
	this.validarContacto({Id, Nombre, Celular, Sexo});
    this.setState({
     datosEditarContacto: {Id, Nombre, Celular, Sexo}, editarContactoModal:! this.state.editarContactoModal
   });
  }

  validacionControles()
  {
    if (((this.state.isNullNombre ==='true'||this.state.isNullCelular ==='true'||this.state.isNullSexo ==='true') && (this.state.alert_message!='')) ||(this.state.isError=== 'true'))
      return true;
    else
      return false;
  }

  render(){
    const {loading} = this.state;
    if(this.state.loggedIn==false)
    {
      return <Redirect  to="/" />
    }
    //Se setea a la variable local contactosReg el objeto contactos que se lleno al ejecutarse el método
    //componentWillMount en automatico y se retorna las filas del Table más una columna con los botones de
    //Editar y eliminar
    let contactosReg = this.state.contactos.map((contacto)=>{
      return(
        <tr key={contacto.Id}>
          <td>{contacto.Id}</td>
          <td>{contacto.Nombre}</td>
          <td> {contacto.Celular}</td>
          <td> {contacto.Sexo}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editarContacto.bind(this, contacto.Id, contacto.Nombre, contacto.Celular, contacto.Sexo)}>Editar</Button>
            <Button color="danger" size="sm" onClick={this.eliminarContacto.bind(this,contacto.Id)}>Eliminar</Button>
          </td>
        </tr>
      )
    });
    // El botón Agregar cambia a true la variable nuevoContactoModal por medio del metodo toggleNuevoContactoModal

    //Modal para modificar datos se abre en automatico cuando su atributo isOpen cambia a verdadero por medio de la variable nuevoContactoModal
    //y se cierra cuando la misma variable cambia a false al presionarse los botones cerrar (x) y cancelar

    //Modal para modificar datos  se abre en automatico cuando su atributo isOpen cambia a verdadero por medio de la variable editarContactoModal
    //y se cierra cuando la misma variable cambia a false al presionarse los botones de cerrar (x) y cancelar

    //ModalHeader: Encabezado del Modal
    //ModalBody: Contenedor de controles
    //ModalFooter:  Pie del Modal, se utiliza comunmente para añadir botones

    //FormGroup: Agrupador de Controles
    //Input propiedad value : se le puede ligar una propiedad de un objeto state, y con el método onChange asignarle
    //al value lo que se captura.
    // let {datosNuevoContacto} = this.state;,  se setea el estado y se almacena lo que se captura
    // datosNuevoContacto.Nombre = e.target.value;, se setea lo que se captura en el input en la propiedad que se indica
    // this.setState({datosNuevoContacto});, se confirma el seteo de la propiedad del objeto

    //<tbody>{contactosReg}</tbody>, la variable local contactosReg proporciona los filas del Table
	  return (
      <div id="divContactos">

      <div className="App container">
        <h2>Aplicación de Contactos</h2>

        <Button  className="my-3" color="primary" onClick={this.toggleNuevoContactoModal.bind(this)}>Agregar</Button>
        <Modal isOpen={this.state.nuevoContactoModal}  toggle={this.toggleNuevoContactoModal.bind(this)}>
          <ModalHeader toggle={this.toggleNuevoContactoModal.bind(this)}>Agregar un Contacto</ModalHeader>
          <ModalBody>
            {this.validacionControles()?<AlertaError mensaje={this.state.alert_message} />:null}
            <FormGroup>
              <Label for="Nombre">Nombre</Label>
            <Input  id="Nombre" style={this.validacionInput(this.state.isNullNombre)} value={this.state.datosNuevoContacto.Nombre} onChange={(e)=>{
                let {datosNuevoContacto} = this.state;
                datosNuevoContacto.Nombre = e.target.value;
                this.setState({datosNuevoContacto});
              }} required="true" maxlength="100" onKeyUp onBlur={(e)=>{
                if (e.target.value == '')
                  {
                    this.setState({isNullNombre: 'true'});
                  }else {
                    this.setState({isNullNombre: 'false'});
                  }
                }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Celular">Celular</Label>
              <Input  id="Celular" style={this.validacionInput(this.state.isNullCelular)} value={this.state.datosNuevoContacto.Celular} onChange={(e)=>{
                var regex = /[^+\d]/g;
                let {datosNuevoContacto} = this.state;
                datosNuevoContacto.Celular = e.target.value.replace(regex,"");
                this.setState({datosNuevoContacto});
              }} required = "true"  onBlur={(e)=>{
                if (e.target.value == '')
                  {
                    this.setState({isNullCelular: 'true'});
                  }else {
                    this.setState({isNullCelular: 'false'});
                  }
                }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Sexo">Sexo</Label>
              <Input  id="Sexo" style={this.validacionInput(this.state.isNullSexo)} value={this.state.datosNuevoContacto.Sexo} onChange={(e)=>{
                let {datosNuevoContacto} = this.state;
                datosNuevoContacto.Sexo = e.target.value;
                this.setState({datosNuevoContacto});
              }} required="true" maxlength="3" minlength="3" onBlur={(e)=>{
                if (e.target.value == '')
                  {
                    this.setState({isNullSexo: 'true'});
                  }else {
                    this.setState({isNullSexo: 'false'});
                  }
                }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.agregarContacto.bind(this)}>
              {loading?<FontAwesomeIcon className="mr-2" icon="sync-alt" spin />: <FontAwesomeIcon className="mr-2" icon="database" />}
              Guardar
            </Button>
            <Button color="secondary" onClick={this.toggleNuevoContactoModal.bind(this)}>
              <FontAwesomeIcon className="mr-2" icon="times" />
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editarContactoModal}  toggle={this.toggleEditarContactoModal.bind(this)}>
         <ModalHeader toggle={this.toggleEditarContactoModal.bind(this)}>Editar un Contacto</ModalHeader>
         <ModalBody>
           {this.validacionControles()?<AlertaError mensaje={this.state.alert_message} />:null}
          <FormGroup>
            <Label for="Nombre">Nombre</Label>
            <Input  id="Nombre"  style={this.validacionInput(this.state.isNullNombre)} value={this.state.datosEditarContacto.Nombre} onChange={(e)=>{
              let {datosEditarContacto} = this.state;
              datosEditarContacto.Nombre = e.target.value;
              this.setState({datosEditarContacto});
            }} required="true" maxlength="100" onBlur={(e)=>{
              if (e.target.value == '')
                {
                  this.setState({isNullNombre: 'true'});
                }else {
                  this.setState({isNullNombre: 'false'});
                }
              }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Celular">Celular</Label>
            <Input  id="Celular" style={this.validacionInput(this.state.isNullCelular)} value={this.state.datosEditarContacto.Celular} onChange={(e)=>{
              var regex = /[^+\d]/g;
              let {datosEditarContacto} = this.state;
              datosEditarContacto.Celular = e.target.value.replace(regex,"");
              this.setState({datosEditarContacto});
            }} required="true" onBlur={(e)=>{
              if (e.target.value == '')
                {
                  this.setState({isNullCelular: 'true'});
                }else {
                  this.setState({isNullCelular: 'false'});
                }
              }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Sexo">Sexo</Label>
          <Input  id="Sexo" style={this.validacionInput(this.state.isNullSexo)} value={this.state.datosEditarContacto.Sexo} onChange={(e)=>{
              let {datosEditarContacto} = this.state;
              datosEditarContacto.Sexo = e.target.value;
              this.setState({datosEditarContacto});
            }} required="true"  maxlength="3" minlength="3" onBlur={(e)=>{
              if (e.target.value == '')
                {
                  this.setState({isNullSexo: 'true'});
                }else {
                  this.setState({isNullSexo: 'false'});
                }
              }}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.actualizarContacto.bind(this)}>
            {loading?<FontAwesomeIcon className="mr-2" icon="sync-alt" spin />: <FontAwesomeIcon className="mr-2" icon="database" />}
            Guardar
          </Button>
          <Button color="secondary" onClick={this.toggleEditarContactoModal.bind(this)}>
            <FontAwesomeIcon className="mr-2" icon="times" />
            Cancelar
          </Button>
        </ModalFooter>
       </Modal>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Celular</th>
              <th>Sexo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactosReg}
          </tbody>
        </Table>
      </div>
    </div>
    );
  }
}

export default Contactos;
