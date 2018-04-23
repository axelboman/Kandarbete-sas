import React, { Component } from "react";
import moment from 'moment';
import { ButtonGroup, Button, Grid, Row, Col, Panel, Form, ControlLabel, FormGroup, FormControl, Tab, NavItem, Nav } from "react-bootstrap";
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
  createTabContent(id1, id2, id3, choice) {
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{choice} hand choice</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontalChoice">
              <Col xs={12} md={3} mdOffset={1}>
                <ControlLabel>Vacation 1</ControlLabel><div />
                {this.createDateRangePicker(id1)}
                <FormControl type="text"
                  placeholder="Enter vacation description" />
              </Col>
              <Col xs={12} md={3} mdOffset={1}>
                <ControlLabel>Vacation 2</ControlLabel><div />
                {this.createDateRangePicker(id2)}
                <FormControl type="text"
                  placeholder="Enter vacation description" />
              </Col>
              <Col xs={12} md={3} mdOffset={1}>
                <ControlLabel>Vacation 3</ControlLabel><div />
                {this.createDateRangePicker(id3)}
                <FormControl type="text"
                  placeholder="Enter vacation description" />
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
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
          <Col xs={12}>
            <div className="text-center">
              <ButtonGroup bsSize="large" >
                <Button>Long time</Button>
                <Button>Short time</Button>
              </ButtonGroup>
            </div>
            <hr />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row className="clearfix">
                <Col xs={12} md={2}>
                  <Nav bsStyle="pills" stacked>
                    <NavItem eventKey="first">First hand choice</NavItem>
                    <NavItem eventKey="second">Second hand choice</NavItem>
                    <NavItem eventKey="third">Third hand choice</NavItem>
                    <hr />
                    <div className="text-center"><Button bsStyle="success" bsSize="large" type="submit">Submit request</Button></div>
                  </Nav>
                </Col>
                <Col xs={12} md={10}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      {this.createTabContent(0, 1, 2, "First")}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      {this.createTabContent(3, 4, 5, "Second")}
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      {this.createTabContent(6, 7, 8, "Third")}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>


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










