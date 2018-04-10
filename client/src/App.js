import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import logo from './SAS-Logo-white.png';
import './App.css';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



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
        
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" ><img src={logo} alt="sasLogo" className="App-logo" /> </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <button className="swithLangButton" type="button">Switch Language</button>

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
              <NavItem>Change Language</NavItem>
            </Nav>
            <Nav pullLeft>
              <LinkContainer to="/wishvacation">
                <NavItem>Wish Vacation</NavItem>
              </LinkContainer>
              <LinkContainer to="/myvacations">
                <NavItem>My Vacations</NavItem>
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







{/* <div className="Tabs">

<Tabs>
  <TabList>
    <Tab>Önska semester</Tab>
    <Tab>Mina semestrar</Tab>
  </TabList>
  <TabPanel>
    <h1 className="App-title">Welcome to Star Alliance!!!</h1>  
  </TabPanel>
  <TabPanel>
    <img src={logo} className="App-logo" alt="logo" />
  </TabPanel> 
</Tabs>

</div> */}