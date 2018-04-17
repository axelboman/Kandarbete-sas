import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";


export default class MyVacations extends Component {
    render() {
        return (
          <div className="text-center">
              <PageHeader>My Vacations</PageHeader>
              <p>Here you can see status of your upcoming vacation as well as you vacation history</p>
          </div>
        );
    }
}