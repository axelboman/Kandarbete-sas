import React, { Component } from "react";
import moment from 'moment';
import { ButtonGroup, Button, Grid, Row, Col, Panel, Form, ControlLabel, FormGroup, FormControl } from "react-bootstrap";
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
        <DateRangePicker
          startDateId={"startDate " + String(id)}
          endDateId={"endDate " + String(id)}
          startDate={this.state.startDates[id]}
          endDate={this.state.endDates[id]}
          onDatesChange={({ startDate, endDate }) => { this.changeDates(startDate, endDate, id) }}
          focusedInput={this.state.focusedInputs[id]}
          onFocusChange={(focusedInput) => { this.changeFocus(focusedInput, id) }}
        />

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
      <Grid fluid >
        <Row className="show-grid">
          <Col xs={0} sm={1} md={2} lg={3}>
          </Col>
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="text-center">
              <ButtonGroup bsSize="large" >
                <Button>Long time</Button>
                <Button>Short time</Button>
              </ButtonGroup>
            </div>
            <hr />
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Vacation 1</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalVacation1Choice1">
                    <Col componentClass={ControlLabel}sm={4}>
                      Choice 1
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(0)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalVacation1Choice2">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 2
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(1)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalVacation1Choice3">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 3
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(2)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea1">
                  <Col componentClass={ControlLabel} sm={2}>
                      Description
                   </Col>
                   <Col sm={8}>
                   <FormControl componentClass="textarea" placeholder="textarea" />
                    </Col>
    </FormGroup>

                  <FormGroup>
                    <Col smOffset={4} sm={10}>
                      <Button type="submit">Submit request</Button>
                    </Col>
                  </FormGroup>
                </Form>
                </Panel.Body>
            </Panel>

            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Vacation 2</Panel.Title>
              </Panel.Heading>
              <Panel.Body>                <Form horizontal>
                  <FormGroup controlId="formHorizontalVacation2Choice1">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 1
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(3)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalVacation2Choice2">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 2
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(4)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalVacation2Choice3">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 3
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(5)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea2">
                  <Col componentClass={ControlLabel} sm={2}>
                      Description
                   </Col>
                   <Col sm={8}>
                   <FormControl componentClass="textarea" placeholder="textarea" />
                    </Col>
    </FormGroup>

                  <FormGroup>
                    <Col smOffset={4} sm={10}>
                      <Button type="submit">Submit request</Button>
                    </Col>
                  </FormGroup>
                </Form></Panel.Body>
            </Panel>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Vacation 3</Panel.Title>
              </Panel.Heading>
              <Panel.Body>                <Form horizontal>
                  <FormGroup controlId="formHorizontalVacation3Choice1">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 1
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(6)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalVacation3Choice2">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 2
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(7)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalVacation3Choice3">
                    <Col componentClass={ControlLabel} sm={4}>
                      Choice 3
                   </Col>
                    <Col sm={6}>
                    {this.createDateRangePicker(8)}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea3">
                  <Col componentClass={ControlLabel} sm={2}>
                      Description
                   </Col>
                   <Col sm={8}>
                   <FormControl componentClass="textarea" placeholder="textarea" />
                    </Col>
    </FormGroup>

                  <FormGroup>
                    <Col smOffset={4} sm={10}>
                      <Button type="submit">Submit request</Button>
                    </Col>
                  </FormGroup>
                </Form></Panel.Body>
            </Panel>

          </Col>
          <Col xs={0} sm={1} md={2} lg={3}>
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










