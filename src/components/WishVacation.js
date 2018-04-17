import React, { Component } from "react";

import "./WishVacation.css";

import Calendar from 'react-calendar';
import DatePicker from 'react-date-picker';




export default class WishVacation extends Component {

    //this is for the calendar section
    state = {
      date: new Date(),
      }
      onChange = date => this.setState({ date })
    
      //This is where the content is rendered.
    render() {
      return (
        <div className="body">
        <div className="container"> 
          <div className="datePickerSection" >
            <div className="handChoice">
              <label>1 First hand choice <br/> </label>
              <label>From: </label>
                <DatePicker className="datePicker"
                  onChange={this.onChange}
                  value={this.state.date}
                />
              <label>To: </label>
                <DatePicker className="datePicker"
                  onChange={this.onChange}
                  value={this.state.date}
                />
      
              </div>
      
              <div className="handChoice">
              <label>2 Second hand choice <br/> </label>
              <label>From: </label>
                <DatePicker className="datePicker"
                  onChange={this.onChange}
                  value={this.state.date}
                />
              <label>To: </label>
                <DatePicker className="datePicker"
                  onChange={this.onChange}
                  value={this.state.date}
                />
      
              </div>
      
              <div className="handChoice">
              <label>3 third hand choice <br/> </label>
              <label>From: </label>
                <DatePicker className="datePicker"
                  onChange={this.onChange}
                  value={this.state.date}
                />
              <label>To: </label>
                <DatePicker className="datePicker"
                  onChange={this.onChange}
                  value={this.state.date}
                />
      
              </div>
          </div>
      
          {/* this is where we create the calenders */}
          <div className="calendarSection">
            <div className="innerCalendar1">
              <Calendar className="celenderStyle"
                onChange={this.onChange}
                value={this.state.date}
              />
            </div>
            <div className="innerCalendar2">
              <Calendar className="celenderStyle"
                onChange={this.onChange}
                value={this.state.date}
              />
            </div>
          </div>
      
        </div>
      </div>
      );
    }
  }


