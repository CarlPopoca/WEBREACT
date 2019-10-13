import React, {Component, Fragment} from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      dropdownOpen: false,
      loggedIn
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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
               <NavLink href="/ingresar">Ingresar</NavLink>
             </NavItem>
             <NavItem>
               <NavLink href="/registrarUsuario">Registrar Usuario</NavLink>
             </NavItem>
        </Fragment>
        )
    }

    return (
      <div>
        <Nav pills>
          <NavItem>
            <NavLink href="/" active>Aplicación de Contactos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contactos">Contactos</NavLink>
          </NavItem>
            {letLogout}
            {letLogin}
        </Nav>
      </div>
    );
  }
}

export default NavMenu;
