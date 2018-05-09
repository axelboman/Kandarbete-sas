import React, { Component } from "react";
import moment from 'moment';
import { Tabs, Row, Col, Radio, Divider, Table, DatePicker, Form, Button, Input } from 'antd';
import axios from 'axios';

function callback(key) {
  console.log(key);
}

export default class Example extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={23}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Wish vacation" key="1"><VacationWisher /></Tabs.TabPane>
              <Tabs.TabPane tab="My vacations" key="2"><MyVacations/></Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}
class MyVacations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacations: [],
    };
  }
  componentDidMount() {
    this.getVacations();
  }
  getVacations() {
    axios.get(`/api/getvacations`)
      .then(res => {
        const vacations = res.data;
        this.setState({ vacations });
      })
  }
  render() {
    const columns = [{
      title: 'Period name',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
  sorter: (a, b) => a.name - b.name,
    }, {
      title: 'Vacation no',
      dataIndex: 'vacation_no',
      key: 'vacation_no',
    }, {
      title: 'Choice no',
      dataIndex: 'choice_no',
      key: 'choice_no',
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text, record) => <span>{moment(record.start_date).format('YYYY-MM-DD')}</span>,
    }, {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (text, record) => <span>{moment(record.start_date).format('YYYY-MM-DD')}</span>,
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <span>{record.status === 0 ? 'Unconfirmed' : 'Confirmed'}</span>,
    } 
  ];
    return (
      <div>
        <p>Here you can see status of your upcoming vacations as well as you vacation history</p>
        <Table columns={columns} dataSource={this.state.vacations} />
      </div>
    )
  }
}
class VacationWisher extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text, record) => <span>{moment(record.start_date).format('YYYY-MM-DD')}</span>,
    }, {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (text, record) => <span>{moment(record.end_date).format('YYYY-MM-DD')}</span>,
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <span>{record.status === undefined ? 'Not applied' : 'Applied'}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.showApplications(record)}>Apply</a>
        </span>
      ),
    }];
    this.state = {
      periodvisibility: true,
      applicationvisibility: false,
      vacationperiods: null,
      activeperiod: null,
      radiovalue: 1,
    };
  }
  componentDidMount() {
    this.getVacationPeriods();
  }
  showApplications(record) {
    this.setState({ periodvisibility: false });
    this.setState({ applicationvisibility: true });
    this.setState({ activeperiod: record });
  }
  getVacationPeriods() {
    axios.get(`/api/getvacationperiods`)
      .then(res => {
        const vacationperiods = res.data;
        this.setState({ vacationperiods });
      })
  }
  onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }
  radioOnChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      radiovalue: e.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.state.periodvisibility &&
          <div>
            <span>Select vacation type:</span><span style={{ marginLeft: 8 }}>
              <Radio.Group onChange={this.onChange} defaultValue="a">
                <Radio.Button value="a">Long time</Radio.Button>
                <Radio.Button value="b">One day</Radio.Button>
              </Radio.Group>
            </span>
            <Divider />

            <p>Periods open for applications:</p>
            <Table columns={this.columns} dataSource={this.state.vacationperiods} />
          </div>}
        {this.state.applicationvisibility &&
          <div>
            <p>You're applying for vacation in the period {this.state.activeperiod.name} between {moment(this.state.activeperiod.start_date).format('YYYY-MM-DD')} and {moment(this.state.activeperiod.end_date).format('YYYY-MM-DD')}</p>
            <span>Select number of correlated vacations: </span>
            <Radio.Group onChange={this.radioOnChange} value={this.state.radiovalue} style={{ marginLeft: 8 }}>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
            </Radio.Group>
            <TimeRelatedForm activePeriod={this.state.activeperiod} numberOfVacations={this.state.radiovalue} />

          </div>}
      </div>
    )
  }
}
const TimeRelatedForm = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        picker12: true,
        picker13: true,
        picker22: true,
        picker23: true,
        picker32: true,
        picker33: true,
      };
    }
    checkRange(fieldsString, moments) {
      if (moments[0] === "") {
        if (fieldsString === 'range-picker11') {
          this.setState({ picker12: true  });
        }
        if (fieldsString === 'range-picker12') {
          this.setState({ picker13: true  });
        }
        if (fieldsString === 'range-picker21') {
          this.setState({ picker22: true  });
        }
        if (fieldsString === 'range-picker22') {
          this.setState({ picker23: true  });
        }
        if (fieldsString === 'range-picker31') {
          this.setState({ picker32: true  });
        }
        if (fieldsString === 'range-picker32') {
          this.setState({ picker33: true });
        }

      }
      if (moments[0] !== "") {
        if (fieldsString === 'range-picker11') {
          this.setState({ picker12: false });
        }
        if (fieldsString === 'range-picker12') {
          this.setState({ picker13: false });
        }
        if (fieldsString === 'range-picker21') {
          this.setState({ picker22: false });
        }
        if (fieldsString === 'range-picker22') {
          this.setState({ picker23: false });
        }
        if (fieldsString === 'range-picker31') {
          this.setState({ picker32: false });
        }
        if (fieldsString === 'range-picker32') {
          this.setState({ picker33: false });
        }

      }
    }

    handleSubmit = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        // Should format date value before submit.
        if (fieldsValue['range-picker11'] !== undefined) {
          axios.post(`/api/sendvacationapplication`, {
            choice_no: 1,
            description: fieldsValue['description1'],
            status: 0,
            created: moment().format('YYYY-MM-DD'),
            period: this.props.activePeriod.id,
            vacation_no: 1,
            start_date: fieldsValue['range-picker11'][0].format('YYYY-MM-DD'),
            end_date: fieldsValue['range-picker11'][1].format('YYYY-MM-DD')
          })
        }
        if (fieldsValue['range-picker12'] !== undefined) {
          axios.post(`/api/sendvacationapplication`, {
            choice_no: 2,
            description: fieldsValue['description1'],
            status: 0,
            created: moment().format('YYYY-MM-DD'),
            period: this.props.activePeriod.id,
            vacation_no: 1,
            start_date: fieldsValue['range-picker12'][0].format('YYYY-MM-DD'),
            end_date: fieldsValue['range-picker12'][1].format('YYYY-MM-DD')
          })
        }
        if (fieldsValue['range-picker13'] !== undefined) {
          axios.post(`/api/sendvacationapplication`, {
            choice_no: 3,
            description: fieldsValue['description1'],
            status: 0,
            created: moment().format('YYYY-MM-DD'),
            period: this.props.activePeriod.id,
            vacation_no: 1,
            start_date: fieldsValue['range-picker13'][0].format('YYYY-MM-DD'),
            end_date: fieldsValue['range-picker13'][1].format('YYYY-MM-DD')
          })
        }
        if (this.props.numberOfVacations >= 2) {
          if (fieldsValue['range-picker21'] !== undefined) {
            axios.post(`/api/sendvacationapplication`, {
              choice_no: 1,
              description: fieldsValue['description2'],
              status: 0,
              created: moment().format('YYYY-MM-DD'),
              period: this.props.activePeriod.id,
              vacation_no: 2,
              start_date: fieldsValue['range-picker21'][0].format('YYYY-MM-DD'),
              end_date: fieldsValue['range-picker21'][1].format('YYYY-MM-DD')
            })
          }
          if (fieldsValue['range-picker22'] !== undefined) {
            axios.post(`/api/sendvacationapplication`, {
              choice_no: 2,
              description: fieldsValue['description2'],
              status: 0,
              created: moment().format('YYYY-MM-DD'),
              period: this.props.activePeriod.id,
              vacation_no: 2,
              start_date: fieldsValue['range-picker22'][0].format('YYYY-MM-DD'),
              end_date: fieldsValue['range-picker22'][1].format('YYYY-MM-DD')
            })
          }
          if (fieldsValue['range-picker23'] !== undefined) {
            axios.post(`/api/sendvacationapplication`, {
              choice_no: 3,
              description: fieldsValue['description2'],
              status: 0,
              created: moment().format('YYYY-MM-DD'),
              period: this.props.activePeriod.id,
              vacation_no: 2,
              start_date: fieldsValue['range-picker23'][0].format('YYYY-MM-DD'),
              end_date: fieldsValue['range-picker23'][1].format('YYYY-MM-DD')
            })
          }
        }
        if (this.props.numberOfVacations >= 3) {
          if (fieldsValue['range-picker31'] !== undefined) {
            axios.post(`/api/sendvacationapplication`, {
              choice_no: 1,
              description: fieldsValue['description3'],
              status: 0,
              created: moment().format('YYYY-MM-DD'),
              period: this.props.activePeriod.id,
              vacation_no: 3,
              start_date: fieldsValue['range-picker31'][0].format('YYYY-MM-DD'),
              end_date: fieldsValue['range-picker31'][1].format('YYYY-MM-DD')
            })
          }
          if (fieldsValue['range-picker32'] !== undefined) {
            axios.post(`/api/sendvacationapplication`, {
              choice_no: 2,
              description: fieldsValue['description3'],
              status: 0,
              created: moment().format('YYYY-MM-DD'),
              period: this.props.activePeriod.id,
              vacation_no: 3,
              start_date: fieldsValue['range-picker32'][0].format('YYYY-MM-DD'),
              end_date: fieldsValue['range-picker32'][1].format('YYYY-MM-DD')
            })
          }
          if (fieldsValue['range-picker33'] !== undefined) {
            axios.post(`/api/sendvacationapplication`, {
              choice_no: 3,
              description: fieldsValue['description3'],
              status: 0,
              created: moment().format('YYYY-MM-DD'),
              period: this.props.activePeriod.id,
              vacation_no: 3,
              start_date: fieldsValue['range-picker33'][0].format('YYYY-MM-DD'),
              end_date: fieldsValue['range-picker33'][1].format('YYYY-MM-DD')
            })
          }
        }
      });
    }
    customDisabledDate(current, activeperiod) {
      // Can not select days before today and today
      return current && current < moment(activeperiod.start_date) || current > moment(activeperiod.end_date);
    }
    render() {

      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
      };

      return (
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                wrapperCol={{
                  xs: { span: 6, offset: 2 },
                  // sm: { span: 16, offset: 8 },
                }}
              >
                <h4>Vacation #1</h4>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="First priority"
              >
                {getFieldDecorator('range-picker11', { rules: [{ type: 'array', required: true, message: 'Please select an interval!' }] })(
                  <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange('range-picker11', moments)} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Second priority"
              >
                {getFieldDecorator('range-picker12', { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                  <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange('range-picker12', moments)} disabled={this.state.picker12} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Third priority"
              >
                {getFieldDecorator('range-picker13', { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                  <DatePicker.RangePicker disabled={this.state.picker13} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                )}
              </Form.Item>
              <Form.Item
                label="Description"
                {...formItemLayout}
              >
                {getFieldDecorator('description1', {
                  rules: [{
                    required: false
                  }],
                })(
                  <Input placeholder="Mention anything important here..." />
                )}
              </Form.Item>
            </Col>
            {this.props.numberOfVacations >= 2 &&
              <Col span={8}>
                <Form.Item
                  wrapperCol={{
                    xs: { span: 6, offset: 2 },
                    // sm: { span: 16, offset: 8 },
                  }}
                >
                  <h4>Vacation #2</h4>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="First priority"
                >
                  {getFieldDecorator('range-picker21', { rules: [{ type: 'array', required: true, message: 'Please select an interval!' }] })(
                    <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange('range-picker21', moments)} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Second priority"
                >
                  {getFieldDecorator('range-picker22', { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                    <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange('range-picker22', moments)} disabled={this.state.picker22} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Third priority"
                >
                  {getFieldDecorator('range-picker23', { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                    <DatePicker.RangePicker disabled={this.state.picker23} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                  )}
                </Form.Item>
                <Form.Item
                  label="Description"
                  {...formItemLayout}
                >
                  {getFieldDecorator('description2', {
                    rules: [{
                      required: false
                    }],
                  })(
                    <Input placeholder="Mention anything important here..." />
                  )}
                </Form.Item>
              </Col>
            }
            {this.props.numberOfVacations >= 3 &&
              <Col span={8}>
                <Form.Item
                  wrapperCol={{
                    xs: { span: 6, offset: 2 },
                    // sm: { span: 16, offset: 8 },
                  }}
                >
                  <h4>Vacation #3</h4>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="First priority"
                >
                  {getFieldDecorator('range-picker31', { rules: [{ type: 'array', required: true, message: 'Please select an interval!' }] })(
                    <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange('range-picker31', moments)} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Second priority"
                >
                  {getFieldDecorator('range-picker32', { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                    <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange('range-picker32', moments)} disabled={this.state.picker32} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Third priority"
                >
                  {getFieldDecorator('range-picker33', { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                    <DatePicker.RangePicker disabled={this.state.picker33} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                  )}
                </Form.Item>
                <Form.Item
                  label="Description"
                  {...formItemLayout}
                >
                  {getFieldDecorator('description3', {
                    rules: [{
                      required: false
                    }],
                  })(
                    <Input placeholder="Mention anything important here..." />
                  )}
                </Form.Item>
              </Col>
            }
          </Row>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 2 },
              // sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      );
    }
  });










