import React, {Component} from 'react';
import {Label, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import axios from 'axios';
class App extends Component  {
  state = {
    contactos: [],
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
    editarContactoModal: false
  }
  componentWillMount(){
    this.refrescarContactos();
  }

  toggleNuevoContactoModal() {
    this.setState({
      nuevoContactoModal: !this.state.nuevoContactoModal,
      datosNuevoContacto: {
        Nombre: '',
        Celular: '',
        Sexo: ''
      }
    });
  }

  toggleEditarContactoModal() {
    //Este metodo se dispara cuando se cierra la ventana modal de editar, y cuando se pulsa el botón de Cancelar
    // convierte el valor de la variable editarContactoModal a false
  this.setState({
    editarContactoModal: !this.state.editarContactoModal
  });
}
  agregarContacto (){

    axios.post('https://localhost:44386/api/Contactos', this.state.datosNuevoContacto).then((response)=>{
    //Se setea la variable de state contactos, los simbolo {} permiten usarla para setearla por medio de let
    //this.state contiene los contactos que se renderizaron en el Table
    let {contactos} = this.state;
    //Se agrega al final el contacto que devolvio el metodo post de la api contactos
    contactos.push(response.data);
    //Inicializa el estado de las variables
    this.setState({contactos, nuevoContactoModal:false, datosNuevoContacto: {
      Nombre: '',
      Celular: '',
      Sexo: ''
    }});

    });
  }

  actualizarContacto()
  {
    let {Id, Nombre, Celular, Sexo} = this.state.datosEditarContacto;

      axios.put('https://localhost:44386/api/Contactos/' + this.state.datosEditarContacto.Id, {
      Id, Nombre, Celular, Sexo
    }).then((response)=>{

      this.refrescarContactos();

      this.setState({editarContactoModal: false, datosEditarContacto: {
            Id: '',
            Nombre: '',
            Celular: '',
            Sexo: ''
          }});
    });
  }

 eliminarContacto(id){
   axios.delete('https://localhost:44386/api/Contactos/'+id).then((response)=>{
     this.refrescarContactos();
   });
 }
  refrescarContactos(){
    axios.get('https://localhost:44386/api/Contactos').then((response)=>{
      this.setState({
            contactos: response.data
      })
    });

  }
  editarContacto (Id, Nombre, Celular, Sexo)
  {
    //Se setea el objeto datosEditarContacto al pulsar el botón de editar
    //Por default la variable editarContactoModal es false pero se niega este valor seteando como verdadero
    //Nota: this.state mantiene el estado de las variables, es como un get pero para setear una  variables se
    //  debe ocupar this.setState
    this.setState({
     datosEditarContacto: {Id, Nombre, Celular, Sexo}, editarContactoModal:! this.state.editarContactoModal
   });
  }
  render(){
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
    //Esta ventana Modal con su atributo se abre en automatico cuando la variable editarContactoModal cambia a true
    //y se cierra cuando la misma variable cambia a false al presionarse los botones de cerrar (x) y cancelar
    return (
      <div className="App container">
        <h1>Aplicación de Contactos</h1>

      <Button  className="my-3" color="primary" onClick={this.toggleNuevoContactoModal.bind(this)}>Agregar</Button>
      <Modal isOpen={this.state.nuevoContactoModal}  toggle={this.toggleNuevoContactoModal.bind(this)}>
        <ModalHeader toggle={this.toggleNuevoContactoModal.bind(this)}>Agregar un Contacto</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Nombre">Nombre</Label>
            <Input  id="Nombre" value={this.state.datosNuevoContacto.Nombre} onChange={(e)=>{
              let {datosNuevoContacto} = this.state;
              datosNuevoContacto.Nombre = e.target.value;
              this.setState({datosNuevoContacto});
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Celular">Celular</Label>
            <Input  id="Celular" value={this.state.datosNuevoContacto.Celular} onChange={(e)=>{
              let {datosNuevoContacto} = this.state;
              datosNuevoContacto.Celular = e.target.value;
              this.setState({datosNuevoContacto});
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Sexo">Sexo</Label>
            <Input  id="Sexo" value={this.state.datosNuevoContacto.Sexo} onChange={(e)=>{
              let {datosNuevoContacto} = this.state;
              datosNuevoContacto.Sexo = e.target.value;
              this.setState({datosNuevoContacto});
            }}/>
          </FormGroup>
        </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={this.agregarContacto.bind(this)}>Guardar</Button>{' '}
         <Button color="secondary" onClick={this.toggleNuevoContactoModal.bind(this)}>Cancelar</Button>
       </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editarContactoModal}  toggle={this.toggleEditarContactoModal.bind(this)}>
       <ModalHeader toggle={this.toggleEditarContactoModal.bind(this)}>Editar un Contacto</ModalHeader>
       <ModalBody>
        <FormGroup>
          <Label for="Nombre">Nombre</Label>
          <Input  id="Nombre" value={this.state.datosEditarContacto.Nombre} onChange={(e)=>{
            let {datosEditarContacto} = this.state;
            datosEditarContacto.Nombre = e.target.value;
            this.setState({datosEditarContacto});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="Celular">Celular</Label>
          <Input  id="Celular" value={this.state.datosEditarContacto.Celular} onChange={(e)=>{
            let {datosEditarContacto} = this.state;
            datosEditarContacto.Celular = e.target.value;
            this.setState({datosEditarContacto});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="Sexo">Sexo</Label>
          <Input  id="Sexo" value={this.state.datosEditarContacto.Sexo} onChange={(e)=>{
            let {datosEditarContacto} = this.state;
            datosEditarContacto.Sexo = e.target.value;
            this.setState({datosEditarContacto});
          }}/>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.actualizarContacto.bind(this)}>Guardar</Button>{' '}
        <Button color="secondary" onClick={this.toggleEditarContactoModal.bind(this)}>Cancelar</Button>
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
    );
  }
}

export default App;
