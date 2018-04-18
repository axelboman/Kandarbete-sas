import React, { Component } from "react";
import moment from 'moment';
import { ButtonGroup, Button } from "react-bootstrap";
import Timeline from 'react-calendar-timeline/lib/'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';

const groups = [
  { id: 1, title: 'Vacation 1: First hand' },
  { id: 2, title: 'Vacation 1: Second hand' },
  { id: 3, title: 'Vacation 1: Third hand' },
  { id: 4, title: 'Vacation 2: First hand' },
  { id: 5, title: 'Vacation 2: Second hand' },
  { id: 6, title: 'Vacation 2: Third hand' },
  { id: 7, title: 'Vacation 3: First hand' },
  { id: 8, title: 'Vacation 3: Second hand' },
  { id: 9, title: 'Vacation 3: Third hand' }
]

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDates: [],
      endDates: [],
      focusedInputs: [],
      startDate11: null,
      endDate11: null,
      focusedInput11: null,
      startDate12: null,
      endDate12: null,
      focusedInput12: null,
      asd12: 'hgfdes'
    };
  }
  createDateRangePicker(id){
    return(
      <div>
      <DateRangePicker
        startDateId={"startDate " + id.toString()}
        endDateId="endDate11"
        startDate={this.state.startDate11}
        endDate={this.state.endDate11}
        onDatesChange={({ startDate, endDate }) => { this.setState({ startDate11: startDate, endDate11: endDate }) }}
        focusedInput={this.state.focusedInput11}
        onFocusChange={(focusedInput) => { this.setState({ focusedInput11: focusedInput }) }}
      />
    </div>
    )
  }

  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const items = numbers.map((number) =>
    ({ id: number, group: number, title: 'item ' + number, start_time: this.state.startDates[number-1], end_time: this.state.endDates[number-1] })
  );
  console.log(this.state.startDates.length);
  console.log("hej " + 55);
    
    // [
    //   { id: 1, group: 1, title: 'item 1', start_time: this.state.startDate11, end_time: this.state.endDate11 },

    // ]
    return (
      <div className="body">

        <div className="selection" >

          <ButtonGroup bsSize="large">
            <Button>Long time</Button>
            <Button>Short time</Button>
          </ButtonGroup>
        </div>
        <hr />
        <div className="container">
<<<<<<< HEAD
        
=======
        <label className="choiceLabel">First hand Choice</label>
>>>>>>> a92c1b81960bf0435ee4f3c51aa7ea8c91364aae
          <div>
            <DateRangePicker
              startDateId="startDate11"
              endDateId="endDate11"
              startDate={this.state.startDate11}
              endDate={this.state.endDate11}
              onDatesChange={({ startDate, endDate }) => { this.setState({ startDate11: startDate, endDate11: endDate }) }}
              focusedInput={this.state.focusedInput11}
              onFocusChange={(focusedInput) => { this.setState({ focusedInput11: focusedInput }) }}
            />
          </div>
          <hr/>
          <label className="choiceLabel">Second hand Choice</label>
          <div>
            <DateRangePicker
              startDateId="startDate12"
              endDateId="endDate12"
              startDate={this.state.startDate12}
              endDate={this.state.endDate12}
              onDatesChange={({ startDate, endDate }) => { this.setState({ startDate12: startDate, endDate12: endDate }) }}
              focusedInput={this.state.focusedInput12}
              onFocusChange={(focusedInput) => { this.setState({ focusedInput12: focusedInput }) }}
            />
          </div>
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










