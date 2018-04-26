import React, { Component, Fragment } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image, Button } from "react-bootstrap";
import logo from './images/SAS-Logo-white.png';
import './css/App.css';
import { Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WishVacation from "./components/WishVacation";
import MyVacations from "./components/MyVacations";
import Admin from "./components/Admin";
import AdminManage from "./components/AdminManage";
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null
    };
  }
  componentWillMount() {
    axios.get(`/api/authenticated`)
      .then(res => {
        this.setState({ authenticated: res.data });

      });

  }

  render() {

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

            <Navbar.Form pullRight>
              {this.state.authenticated ?
                <Button
                  bsStyle="danger"
                  onClick={() => { axios.get(`/api/logout`) }}
                  href="/login"
                >Logout</Button> :
                <Button bsStyle="danger" href="/login">Login</Button>
              }
            </Navbar.Form>

            <Nav pullRight>
              <NavDropdown title="Change Language" id="basic-nav-dropdown">
                <MenuItem >Swedish</MenuItem>
                <MenuItem >Norwegian</MenuItem>
                <MenuItem >Danish</MenuItem>
                <MenuItem >English</MenuItem>
              </NavDropdown>
            </Nav>
            {this.state.authenticated &&
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
            }
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          
          <Route exact path="/signup" component={Signup} />
            {this.state.authenticated && <Route exact path="/" component={MyVacations}/>}
            {this.state.authenticated && <Route exact path="/login" component={MyVacations}/>}
            {this.state.authenticated && <Route exact path="/wishvacation" component={WishVacation} />}
            {this.state.authenticated && <Route exact path="/myvacations" component={MyVacations} />}
            {this.state.authenticated && <Route exact path="/admin" component={Admin} />}
            {this.state.authenticated && <Route exact path="/adminmanage" component={AdminManage} />}
        
          {!this.state.authenticated  && <Route exact path="/" component={Login} />}
          {!this.state.authenticated  && <Route exact path="/login" component={Login} />}
          {!this.state.authenticated  && <Route exact path="/wishvacation" component={Login} />}
          {!this.state.authenticated  && <Route exact path="/myvacations" component={Login} />}
          {!this.state.authenticated  && <Route exact path="/admin" component={Login} />}
          {!this.state.authenticated  && <Route exact path="/adminmanage" component={Login} />}

          <Route component={NotFound} />
          
        </Switch>

      </div>

    );
  }
}
export default App;

