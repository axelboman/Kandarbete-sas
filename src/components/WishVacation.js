import React, { Component } from "react";
import moment from 'moment';
import { ButtonGroup, Button } from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Timeline from 'react-calendar-timeline/lib/'
import Helmet from 'react-helmet';

import { formatDate, parseDate } from 'react-day-picker/moment';

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
var fromid

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.handleFromChange1 = this.handleFromChange1.bind(this);
    this.handleToChange1 = this.handleToChange1.bind(this);
    this.handleFromChange2 = this.handleFromChange2.bind(this);
    this.handleToChange2 = this.handleToChange2.bind(this);
    this.handleFromChange3 = this.handleFromChange3.bind(this);
    this.handleToChange3 = this.handleToChange3.bind(this);
    this.state = {
      from11: undefined,
      from12: undefined,
      from13: undefined,
      to11: undefined,
      to12: undefined,
      to13: undefined
    };
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  focusTo() {
    // Focus to `to` field. A timeout is required here because the overlays
    // already set timeouts to work well with input fields
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }
  showFromMonth() {
    const { from11,from12,from13, to11, to12, to13 } = this.state;
    if (!from11 || !from12 || !from13) {
      return;
    }
    // if (moment(to).diff(moment(from), 'months') < 2) {
      
    //   this.to.getDayPicker().showMonth(from);
    // }else{
    //   console.log(moment(to).diff(moment(from), 'months'));
    // }
    
  }
  handleFromChange1(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from11: from }, () => {
      // if (!this.state.to) {
      //   this.focusTo();
      // }
    });
    
  }
  handleFromChange2(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from12: from }, () => {
      // if (!this.state.to) {
      //   this.focusTo();
      // }
    });
    
  }
  handleFromChange3(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from13: from  }, () => {
      // if (!this.state.to) {
      //   this.focusTo();
      // }
    });
    
  }
  handleToChange1(to) {
    this.setState({ to11: to }, this.showFromMonth);
  }
  handleToChange2(to) {
    this.setState({ to12: to }, this.showFromMonth);
  }
  handleToChange3(to) {
    this.setState({ to13: to }, this.showFromMonth);
  }
  renderButtons(size) {
    return(<Button>{size} time</Button>)
  }

  renderInputs(from, to, modifiers, id) {
    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          inputProps={id}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
          }}
          onDayChange={this.handleToChange}
        />{' '}
        —{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            inputProps={id}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>

      </div>
    );
    console.log(id);

  }


  render() {
    // const {from11, from12, from13, from21, from22, from23, from31, from32, from33, to11, to12, to13, to21, to22, to23, to31, to32, to33} = this.state;
    const { from11, from12, from13, to11, to12, to13 } = this.state;
    
    
    const items = [
      { id: 1, group: 1, title: 'item 1', start_time: from11, end_time: to11 },
      { id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'days'), end_time: moment().add(0.5, 'days') },
    ]
    const modifiers11 = { start: from11, end: to11 };
    const modifiers12 = { start: from12, end: to12 };
    const modifiers13 = { start: from13, end: to13 };
    const testaa = "Long";
    const testarray = [];
    testarray[4] = "Long";
   
   
    return (
      <div className="body">

        <div className="selection" >

          <ButtonGroup bsSize="large">

            {this.renderButtons(testarray[4])}
            <Button>Short time</Button>
          </ButtonGroup>
        </div>

        <div className="container">
        {this.renderInputs(from11, to11, modifiers11, 0)}
        {this.renderInputs(from12, to12, modifiers12, 1)}
        {this.renderInputs(from13, to13, modifiers13, 2)}
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










