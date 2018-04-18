import React, { Component, Fragment } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import logo from './SAS-Logo-white.png';
import './App.css';




class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false, //Ska vara "false" från början men ändra för att se "logout"
      isAuthenticating: true     
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }
  

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App">
        
        <Navbar fixedTop inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
            <Image src={logo} alt="sasLogo" className="App-logo" />
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : <Fragment>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
            }
            </Nav>
            <Nav pullRight>
            <NavDropdown title="Change Language" >
        <MenuItem >Swedish</MenuItem>
        <MenuItem >Norwegian</MenuItem>
        <MenuItem >Danish</MenuItem>
        <MenuItem >English</MenuItem>
      </NavDropdown>
            </Nav>
            <Nav pullLeft>
              <LinkContainer className="Tabs" to="/wishvacation">
                <NavItem className="Tabs" >Wish Vacation</NavItem>
              </LinkContainer>
              <LinkContainer to="/myvacations">
                <NavItem>My Vacations</NavItem>
              </LinkContainer>
              <LinkContainer to="/admin">
                <NavItem>Admin</NavItem>
              </LinkContainer>               
            </Nav>
          </Navbar.Collapse>  
        </Navbar>
        <Routes childProps={childProps}  />

      </div>

    );
  }
}
export default App;

