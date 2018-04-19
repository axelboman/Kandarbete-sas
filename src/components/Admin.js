import React, { Component } from "react";
import moment from 'moment';
import { ButtonGroup, Button, Image, DropdownButton, SplitButton, MenuItem, Grid, Row, Col } from "react-bootstrap";
import Timeline from 'react-calendar-timeline/lib/'
import logo from '../calendar-icon.png';

const groups = [
  { id: 1, title: 'Armin Zakeri' },
  { id: 2, title: 'Axel Boman' },
  { id: 3, title: 'Carl Westerberg' },
  { id: 4, title: 'Freddy Buske' },
  { id: 5, title: 'Mogge Bagge' },
  { id: 6, title: 'Petter 激酶粉撲' }
]


export default class Admin extends Component {
  constructor(props) {
    super(props);
  }

  handleManageButtonClick = (onClick) => {
    console.log("manage application");
  }
  render() {
    const items = []

    return (
      <Grid fluid >
        <Col xs={12}>
          <div className="adminHeader">
            <h1>Vacation</h1>
          </div>

          <div className="manageButton">
            <ButtonGroup bsStyle="primary" >
              <Button
                onClick={() => this.handleManageButtonClick()}
              >Manage Applications</Button>
            </ButtonGroup>
          </div>

          <div><Image src={logo} alt="calendarIcon" className="calendar-icon" /> Vacation calendar</div>
          <hr className="adminBreak">
          </hr>

          <div className="dropDownGroups">
            <DropdownButton title="Groups" key="" id="groupDropDown">
              <MenuItem eventKey="1">Group1</MenuItem>
              <MenuItem eventKey="2">Group2</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="3">All</MenuItem>
            </DropdownButton>
          </div>

          <div >
            <Timeline className="timeLine"
              groups={groups}
              items={items}
              defaultTimeStart={moment().startOf('month')}
              defaultTimeEnd={moment().endOf('month').add(1, 'month')}
            />
          </div>
        </Col>
      </Grid>



    );
  }
}










