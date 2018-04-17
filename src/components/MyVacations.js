import React, { Component } from "react";
import "./MyVacations.css";



export default class MyVacations extends Component {
    render() {
        return (
          <div className="myvacations">
            <div className="mv_lander">
              <h1>My Vacations</h1>
              <p>Here you can see status of your upcoming vacation as well as you vacation history</p>
            </div>
          </div>
        );
    }
}