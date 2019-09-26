import React, {Component} from 'react';
import {Label, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import axios from 'axios';
class App extends Component  {
  state = {
    contactos: [],
    nuevoContacto: {
      Nombre: '',
      Celular: '',
      Sexo: ''
    },
    nuevoContactoModal: false
  }
  componentWillMount(){
    axios.get('https://localhost:44386/api/Contactos').then((response)=>{
      this.setState({
            contactos: response.data
      })
    });
  }

  toggleNuevoContactoModal() {
    this.setState({
      nuevoContactoModal: !this.state.nuevoContactoModal
    });
  }
  agregarContacto (){

    axios.post('https://localhost:44386/api/Contactos', this.state.nuevoContacto).then((response)=>{
    //Se setea la variable de state contactos, los simbolo {} permiten usarla para setearla por medio de let
    //this.state contiene los contactos que se renderizaron en el Table
    let {contactos} = this.state;
    //Se agrega al final el contacto que devolvio el metodo post de la api contactos
    contactos.push(response.data);
    //Inicializa el estado de las variables
    this.setState({contactos, nuevoContactoModal:false, nuevoContacto: {
      Nombre: '',
      Celular: '',
      Sexo: ''
    }});

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
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">
      <Button color="primary" onClick={this.toggleNuevoContactoModal.bind(this)}>Agregar</Button>
      <Modal isOpen={this.state.nuevoContactoModal}  toggle={this.toggleNuevoContactoModal.bind(this)}>
        <ModalHeader toggle={this.toggleNuevoContactoModal.bind(this)}>Agregar un Contacto</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Nombre">Nombre</Label>
            <Input  id="Nombre" value={this.state.nuevoContacto.Nombre} onChange={(e)=>{
              let {nuevoContacto} = this.state;
              nuevoContacto.Nombre = e.target.value;
              this.setState({nuevoContacto});
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Celular">Celular</Label>
            <Input  id="Celular" value={this.state.nuevoContacto.Celular} onChange={(e)=>{
              let {nuevoContacto} = this.state;
              nuevoContacto.Celular = e.target.value;
              this.setState({nuevoContacto});
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Sexo">Sexo</Label>
            <Input  id="Sexo" value={this.state.nuevoContacto.Sexo} onChange={(e)=>{
              let {nuevoContacto} = this.state;
              nuevoContacto.Sexo = e.target.value;
              this.setState({nuevoContacto});
            }}/>
          </FormGroup>
        </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={this.agregarContacto.bind(this)}>Guardar</Button>{' '}
         <Button color="secondary" onClick={this.toggleNuevoContactoModal.bind(this)}>Cancelar</Button>
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
