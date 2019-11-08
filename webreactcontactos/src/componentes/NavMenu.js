import React, {Component, Fragment} from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';
import {withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
     this.changeNavItem = this.changeNavItem.bind(this);
  }

componentDidMount(){

  if (this.props.location.pathname != null)
    this.changeNavItem(this.props.location.pathname);
}

componentWillReceiveProps(nextProps){

 if(this.props.location.pathname !== nextProps.location.pathname){
   this.changeNavItem(nextProps.location.pathname);
  }
}

changeNavItem(currentRoute){

  const token = localStorage.getItem("token");
  let loggedIn = true;
  if (token==null){
    loggedIn = false;
  }

  this.setState({
    loggedIn: loggedIn
  });

}
  render() {
    if(this.state.loggedIn===true)
    {
      var letLogout = (
        <Fragment>
          <NavItem>
            <NavLink href="/cerrarSesion">Cerrar sesion</NavLink>
          </NavItem>
         </Fragment>
      )
    }
    else  {
       var letLogin = (
         <Fragment>
             <NavItem>
               <NavLink href="/iniciarSesion">Ingresar</NavLink>
             </NavItem>
             <NavItem>
               <NavLink href="/registrarUsuario">Registrar Usuario</NavLink>
             </NavItem>
        </Fragment>
        )
    }

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav pills location={this.props.location}>
              <NavItem>
                <NavLink href="/" active>Aplicación de Contactos</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contactos">Contactos</NavLink>
              </NavItem>
                {letLogout}
                {letLogin}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavMenu);
