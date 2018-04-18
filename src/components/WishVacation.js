import React, { Component } from "react";
import moment from 'moment';
import { ButtonGroup, Button, Grid, Row, Col } from "react-bootstrap";
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
      focusedInputs: []
    };
  }
  createDateRangePicker(id) {
    return (
      <div>
        <DateRangePicker
          startDateId={"startDate " + String(id)}
          endDateId={"endDate " + String(id)}
          startDate={this.state.startDates[id]}
          endDate={this.state.endDates[id]}
          onDatesChange={({ startDate, endDate }) => { this.changeDates(startDate, endDate, id) }}
          focusedInput={this.state.focusedInputs[id]}
          onFocusChange={(focusedInput) => { this.changeFocus(focusedInput, id) }}
        />
      </div>
    )
  }
  changeDates(startDate, endDate, id) {
    let startDatesClone = this.state.startDates.slice();
    let endDatesClone = this.state.endDates.slice();
    startDatesClone[id] = startDate;
    endDatesClone[id] = endDate;
    this.setState({ startDates: startDatesClone, endDates: endDatesClone });
  }
  changeFocus(focusedInput, id) {
    let focusedInputsClone = this.state.focusedInputs.slice();
    focusedInputsClone[id] = focusedInput
    this.setState({ focusedInputs: focusedInputsClone });
  }


  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const items = numbers.map((number) =>
      ({ id: number, group: number, title: 'item ' + number, start_time: this.state.startDates[number - 1], end_time: this.state.endDates[number - 1] })
    );
    return (
      <Grid fluid className="text-center">
        <Row className="show-grid">
          <Col xs={12}>
            <div>
              <ButtonGroup bsSize="large">
                <Button>Long time</Button>
                <Button>Short time</Button>
              </ButtonGroup>
            </div>
            <hr />
            <div>
              {this.createDateRangePicker(0)}
              {this.createDateRangePicker(1)}
              {this.createDateRangePicker(2)}
              {this.createDateRangePicker(3)}
              {this.createDateRangePicker(4)}
              {this.createDateRangePicker(5)}
              {this.createDateRangePicker(6)}
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="show-grid">

          <Col xs={12}>
            <Timeline className="timeLine" groups={groups}
              items={items}
              defaultTimeStart={moment().startOf('month')}
              defaultTimeEnd={moment().endOf('month').add(2, 'month')}
            />
          </Col>


        </Row>
      </Grid>

    );
  }
}










