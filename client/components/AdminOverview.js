import React, { Component } from "react";
import VacationPeriods from "./VacationPeriods";
import Staff from "./Staff";
import Applications from "./Applications";
import { Tabs, Row, Col} from 'antd';

function callback(key) {
  console.log(key);
}

export default class Admin extends Component {

  render() {

    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={23}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Vacation periods" key="1"><VacationPeriods /></Tabs.TabPane>
              <Tabs.TabPane tab="Staff" key="2"><Staff /></Tabs.TabPane>
              <Tabs.TabPane tab="Applications" key="3"><Applications /></Tabs.TabPane>
            </Tabs>

        
          </Col>
        </Row>
      </div>



    );
  }
}











