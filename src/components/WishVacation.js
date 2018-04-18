import React, { Component } from "react";
import moment from 'moment';
import { ButtonGroup, Button} from "react-bootstrap";
import Timeline from 'react-calendar-timeline/lib/'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

const groups = [
  { id: 1, title: 'First hand' },
  { id: 2, title: 'Second hand' },
  { id: 3, title: 'Third hand' }
]



export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate11: null,
      endDate11: null,
      focusedInput11: null,
      startDate12: null,
      endDate12: null,
      focusedInput12: null,
    };
  }

  render() { 
    const items = [
      // { id: 1, group: 1, title: 'item 1', start_time: from, end_time: to },
      { id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'days'), end_time: moment().add(0.5, 'days') },
    ]
    return (
      <div className="body">

        <div className="selection" >

          <ButtonGroup bsSize="large">
            <Button>Long time</Button>
            <Button>Short time</Button>
          </ButtonGroup>
        </div>

        <div className="container">
        <DateRangePicker
          startDateId="startDate11"
          endDateId="endDate11"
          startDate={this.state.startDate11}
          endDate={this.state.endDate11}
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate11: startDate, endDate11: endDate})}}
          focusedInput={this.state.focusedInput11}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput11: focusedInput })}}
        />
        <DateRangePicker
          startDateId="startDate12"
          endDateId="endDate12"
          startDate={this.state.startDate12}
          endDate={this.state.endDate12}
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate12: startDate, endDate12: endDate})}}
          focusedInput={this.state.focusedInput12}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput12: focusedInput })}}
        />
        </div>


        <hr />
        <div >
          <Timeline className="timeLine" groups={groups}
            items={items}
            defaultTimeStart={moment().startOf('month')}
            defaultTimeEnd={moment().endOf('month').add(1, 'month')}
          />
        </div>
      </div>



    );
  }
}










