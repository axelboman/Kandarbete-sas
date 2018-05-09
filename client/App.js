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
import AdminOverview from "./components/AdminOverview";
import AdminManage from "./components/AdminManage";
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      name: null
    };
  }
  componentWillMount() {
    axios.get(`/api/getstatus`)
      .then(res => {
        this.setState({ status: res.data.status });
        if (res.data.status >= 1) {
          this.setState({ name: res.data.first_name + " " + res.data.last_name });
        };

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
              {this.state.status >= 1 ?
                <Button
                  bsStyle="danger"
                  onClick={() => { axios.get(`/api/logout`) }}
                  href="/login"
                >Logout</Button> :
                <Button bsStyle="danger" href="/login">Login</Button>
              }
            </Navbar.Form>

            <Nav pullRight>
            {this.state.status >= 1 &&
                <Navbar.Text>
                  Signed in as: {this.state.name}
                </Navbar.Text>
              }
              <NavDropdown title="Change Language" id="basic-nav-dropdown">
                <MenuItem >Swedish</MenuItem>
                <MenuItem >Norwegian</MenuItem>
                <MenuItem >Danish</MenuItem>
                <MenuItem >English</MenuItem>
              </NavDropdown>

            </Nav>
            {this.state.status === 1 &&
              <Nav pullLeft>
                <LinkContainer to="/wishvacation">
                  <NavItem >Wish Vacation</NavItem>
                </LinkContainer>
                <LinkContainer to="/myvacations">
                  <NavItem >My Vacations</NavItem>
                </LinkContainer>
              </Nav>
            }
            {this.state.status === 2 &&
              <Nav pullLeft>
                <LinkContainer to="/overview">
                  <NavItem>Overview</NavItem>
                </LinkContainer>
                <LinkContainer to="/manage">
                  <NavItem>Manage</NavItem>
                </LinkContainer>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
        <Switch>

          <Route exact path="/signup" component={Signup} />
          {this.state.status === 1 &&
            <Fragment><Route exact path="/" component={MyVacations} />
              <Route exact path="/login" component={MyVacations} />
              <Route exact path="/wishvacation" component={WishVacation} />
              <Route exact path="/myvacations" component={MyVacations} />
              <Route exact path="/overview" component={MyVacations} />
              <Route exact path="/manage" component={MyVacations} />
            </Fragment>}
          {this.state.status === 2 &&
            <Fragment><Route exact path="/" component={AdminOverview} />
              <Route exact path="/login" component={AdminOverview} />
              <Route exact path="/overview" component={AdminOverview} />
              <Route exact path="/manage" component={AdminManage} />
              <Route exact path="/wishvacation" component={AdminOverview} />
              <Route exact path="/myvacations" component={AdminOverview} />
            </Fragment>}
          {this.state.status === 0 &&
            <Fragment><Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/wishvacation" component={Login} />
              <Route exact path="/myvacations" component={Login} />
              <Route exact path="/overview" component={Login} />
              <Route exact path="/manage" component={Login} />
            </Fragment>}

          {/* {!this.state.isUser  && <Route exact path="/" component={Login} />}
          {!this.state.isUser  && <Route exact path="/login" component={Login} />}
          {!this.state.isUser  && <Route exact path="/wishvacation" component={Login} />}
          {!this.state.isUser  && <Route exact path="/myvacations" component={Login} />}
          {!this.state.isUser  && <Route exact path="/admin" component={Login} />}
          {!this.state.isUser  && <Route exact path="/adminmanage" component={Login} />} */}

          <Route component={NotFound} />

        </Switch>

      </div>

    );
  }
}
export default App;

