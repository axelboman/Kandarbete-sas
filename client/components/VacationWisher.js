import React, { Component } from "react";
import moment from 'moment';
import { Tabs, Row, Col, Radio, Divider, Table, DatePicker, Form, Button, Input } from 'antd';
import axios from 'axios';

export default class VacationWisher extends Component {
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
            render: (text, record) => <span>{record.status == 0 ? 'Not applied' : 'Applied'}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                   {record.status == 0 ? <a onClick={() => this.showApplications(record)}>Apply</a> : null }
                </span>
            ),
        }];
        this.state = {
            periodvisibility: true,
            applicationvisibility: false,
            onedayvisibility: false,
            vacationperiods: null,
            vacations: [],
            activeperiod: null,
            activevacations: [],
            radiovalue: 1,
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.getVacationPeriods();
    }
    showApplications(record) {
        this.setState({ periodvisibility: false });
        this.setState({ applicationvisibility: true });
        this.setState({ activeperiod: record });
        // var activevacations = [];
        // for (var i = 0; i < this.state.vacations.length; i++) {
        //     if (this.state.vacations[i].period == record.id) {
        //         activevacations[activevacations.length] = this.state.vacations[i]
        //         if (this.state.vacations[i].vacation_no == 2 && this.state.radiovalue < 2) {
        //             this.setState({ radiovalue: 2 });

        //         }
        //         if (this.state.vacations[i].vacation_no == 3 && this.state.radiovalue < 3) {
        //             this.setState({ radiovalue: 3 });

        //         }
        //     }
        // }
        // this.setState({ activevacations });
    }
    getVacationPeriods() {
        axios.get(`/api/getvacationperiods`)
            .then(res => {
                const vacationperiods = res.data;
                for (var i = 0; i < vacationperiods.length; i++) {
                    vacationperiods[i].status = 0;
                    vacationperiods[i].key = vacationperiods[i].id;
                }
                this.setState({ vacationperiods });
                var vacationperiods = this.state.vacationperiods;
                var vacations = this.state.vacations;
                for (var i = 0; i < this.state.vacationperiods.length; i++) {
                    axios.get(`/api/getapplications`, { params: { period: this.state.vacationperiods[i].id } })
                        .then(res => {
                            for (var i = 0; i < this.state.vacationperiods.length; i++) {
                                if (res.data.length != 0) {
                                    if (this.state.vacationperiods[i].id == res.data[0].period) {
                                        vacationperiods[i].status = 1;
                                    }
                                }
                            }
                            this.setState({ vacationperiods: vacationperiods });
                            for (var i = 0; i < res.data.length; i++) {
                                vacations[vacations.length] = res.data[i];
                            }
                            this.setState({ vacations });
                        })
                }
            })

    }

    onChange(e) {
        if (e.target.value === "a") {
            this.setState({ periodvisibility: true });
            this.setState({ applicationvisibility: false });
            this.setState({ onedayvisibility: false });
        }
        if (e.target.value === "b") {
            this.setState({ periodvisibility: false });
            this.setState({ applicationvisibility: false });
            this.setState({ onedayvisibility: true });
        }

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
                <span>Select vacation type:</span><span style={{ marginLeft: 8 }}>
                    <Radio.Group onChange={this.onChange} defaultValue="a">
                        <Radio.Button value="a">Long time</Radio.Button>
                        <Radio.Button value="b">One day</Radio.Button>
                    </Radio.Group>
                </span>
                <Divider />
                {this.state.onedayvisibility &&
                    <div>
                        <OneDayRelatedForm />
                    </div>}
                {this.state.periodvisibility &&
                    <div>



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
                        <TimeRelatedForm activePeriod={this.state.activeperiod} activeVacations={this.state.activevacations} numberOfVacations={this.state.radiovalue} />

                    </div>}
            </div>
        )
    }
}
const OneDayRelatedForm = Form.create()(class extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            axios.post(`/api/sendvacationapplication`, {
                choice_no: null,
                description: fieldsValue['description'],
                status: 0,
                created: moment().format('YYYY-MM-DD'),
                period: null,
                vacation_no: null,
                start_date: fieldsValue['date-picker'].format('YYYY-MM-DD'),
                end_date: fieldsValue['date-picker'].format('YYYY-MM-DD')
            })
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select a date!' }],
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
                    label="Select the day you want your vacation"
                >
                    {getFieldDecorator('date-picker', config)(
                        <DatePicker />
                    )}
                </Form.Item>
                <Form.Item
                    label="Description"
                    {...formItemLayout}
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            required: false
                        }],
                    })(
                        <Input placeholder="Mention anything important here..." />
                    )}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>

        )
    }
}
);
const TimeRelatedForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                activevacations: this.props.activeVacations,
                pickers: [],
            };
        }
        checkRange(fieldsString, moments) {
            var pickers = this.state.pickers;
            if (moments[0] === "") {
                pickers[fieldsString] = true;
                this.setState({ pickers });
            }
            if (moments[0] !== "") {
                pickers[fieldsString] = false;
                this.setState({ pickers });

            }
        }
        createValidators(id, fieldsValue) {
            if (fieldsValue[`range-picker${id}1`] !== undefined) {
                axios.post(`/api/sendvacationapplication`, {
                    choice_no: 1,
                    description: fieldsValue[`description${id}`],
                    status: 0,
                    created: moment().format('YYYY-MM-DD'),
                    period: this.props.activePeriod.id,
                    vacation_no: id,
                    start_date: fieldsValue[`range-picker${id}1`][0].format('YYYY-MM-DD'),
                    end_date: fieldsValue[`range-picker${id}1`][1].format('YYYY-MM-DD')
                })
            }
            if (fieldsValue[`range-picker${id}2`] !== undefined) {
                axios.post(`/api/sendvacationapplication`, {
                    choice_no: 2,
                    description: fieldsValue[`description${id}`],
                    status: 0,
                    created: moment().format('YYYY-MM-DD'),
                    period: this.props.activePeriod.id,
                    vacation_no: id,
                    start_date: fieldsValue[`range-picker${id}2`][0].format('YYYY-MM-DD'),
                    end_date: fieldsValue[`range-picker${id}2`][1].format('YYYY-MM-DD')
                })
            }
            if (fieldsValue[`range-picker${id}3`] !== undefined) {
                axios.post(`/api/sendvacationapplication`, {
                    choice_no: 3,
                    description: fieldsValue[`description${id}`],
                    status: 0,
                    created: moment().format('YYYY-MM-DD'),
                    period: this.props.activePeriod.id,
                    vacation_no: id,
                    start_date: fieldsValue[`range-picker${id}3`][0].format('YYYY-MM-DD'),
                    end_date: fieldsValue[`range-picker${id}3`][1].format('YYYY-MM-DD')
                })
            }

        }
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, fieldsValue) => {
                if (err) {
                    return;
                }
                // Should format date value before submit.
                this.createValidators(1, fieldsValue);
                if (this.props.numberOfVacations >= 2) {
                    this.createValidators(2, fieldsValue);
                }
                if (this.props.numberOfVacations >= 3) {
                    this.createValidators(3, fieldsValue);
                }
            });
            window.location = "/";
        }
        componentDidMount() {
            var pickers = [];
            for (var i = 0; i < 6; i++) {
                pickers[i] = true;
            }
            this.setState({ pickers });
        }
        customDisabledDate(current, activeperiod) {
            // Can not select days before today and today
            return current && current < moment(activeperiod.start_date) || current > moment(activeperiod.end_date);
        }
        createFormFields(id) {
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
                <Col span={8}>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 6, offset: 2 },
                            // sm: { span: 16, offset: 8 },
                        }}
                    >
                        <h4>Vacation #{id}</h4>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="First priority"
                    >
                        {getFieldDecorator(`range-picker${id}1`, { rules: [{ type: 'array', required: true, message: 'Please select an interval!' }] })(
                            <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange(2 * (id - 1), moments)} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Second priority"
                    >
                        {getFieldDecorator(`range-picker${id}2`, { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                            <DatePicker.RangePicker onChange={(dates, moments) => this.checkRange(2 * (id - 1) + 1, moments)} disabled={this.state.pickers[2 * (id - 1)]} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Third priority"
                    >
                        {getFieldDecorator(`range-picker${id}3`, { rules: [{ type: 'array', required: false, message: 'Please select an interval!' }] })(
                            <DatePicker.RangePicker disabled={this.state.pickers[2 * (id - 1) + 1]} disabledDate={(current) => this.customDisabledDate(current, this.props.activePeriod)} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        {...formItemLayout}
                    >
                        {getFieldDecorator(`description${id}`, {
                            rules: [{
                                required: false
                            }],
                        })(
                            <Input placeholder="Mention anything important here..." />
                        )}
                    </Form.Item>
                </Col>
            )
        }
        render() {


            return (
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={8}>
                        {this.createFormFields(1)}
                        {this.props.numberOfVacations >= 2 &&
                            this.createFormFields(2)
                        }
                        {this.props.numberOfVacations >= 3 &&
                            this.createFormFields(3)
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
