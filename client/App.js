import React, { Component, Fragment } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image } from "react-bootstrap";
import logo from './SAS-Logo-white.png';
import './App.css';
import { Route, Switch } from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import WishVacation from "./components/WishVacation";
import MyVacations from "./components/MyVacations";
import Admin from "./components/Admin";
import AdminManage from "./components/AdminManage";




class App extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isAuthenticated: false, //Ska vara "false" från början men ändra för att se "logout"
  //     isAuthenticating: true
  //   };
  // }

  // userHasAuthenticated = authenticated => {
  //   this.setState({ isAuthenticated: authenticated });
  // }

  // handleLogout = event => {
  //   this.userHasAuthenticated(false);
  // }


  render() {
    // const childProps = {
    //   isAuthenticated: this.state.isAuthenticated,
    //   userHasAuthenticated: this.userHasAuthenticated
    // };
    return (
      <div className="App">

        <Navbar fixedTop inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Image src={logo} alt="sasLogo" className="App-logo" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {/* {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment> */}
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                {/* </Fragment>
              } */}
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
              <LinkContainer to="/wishvacation">
                <NavItem >Wish Vacation</NavItem>
              </LinkContainer>
              <LinkContainer to="/myvacations">
                <NavItem >My Vacations</NavItem>
                </LinkContainer>
              <LinkContainer to="/admin">
                <NavItem>Admin</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/wishvacation" component={WishVacation} />
          <Route exact path="/myvacations" component={MyVacations} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/adminmanage" component={AdminManage} />
          <Route component={NotFound} />
        </Switch>

      </div>

    );
  }
}
export default App;

