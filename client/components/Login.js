import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../css/Login.css";

export default class Login extends Component {
    render() {
        return (
            <div className="Login">
                <form method="post" action="/api/login">
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            name="username"

                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            name="password"
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}