import React from "react";
import { Switch, Icon, Button, Modal, Form, Input, Radio, DatePicker, Table, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import moment from 'moment';
const FormItem = Form.Item;

export default class Applications extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'Emp no',
            dataIndex: 'emp_no',
            key: 'emp_no',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.emp_no - b.emp_no,
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
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
            render: (text, record) => <span>{moment(record.created).format('YYYY-MM-DD')}</span>,

        }, {
            title: 'Vacation no',
            dataIndex: 'vacation_no',
            key: 'vacation_no',
        }, 
        {
            title: 'Choice no',
            dataIndex: 'choice_no',
            key: 'choice_no',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => <span>{record.status === 0 && 'Not reviewed'}{record.status === 1 && 'Denied'}{record.status === 2 && 'Accepted'}</span>,
        },
            // {
            //     title: 'Qualifications',
            //     dataIndex: 'status',
            //     key: 'status',
            //     render: (text, record) => <span>{record.status ===  1 && 'Staff'}{record.status ===  2 && 'Admin'}</span>,
            // },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={() => this.confirmApplication(record)}>Confirm</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.denyApplication(record)}>Deny</a>
                        <Divider type="vertical" />
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    </span>
                ),
            }
        ];
        this.state = {
            applications: null
        };
    }
    componentDidMount() {
        this.getApplications();
    }
    confirmApplication(record){
        var dataSource = [...this.state.applications];
        axios.post(`/api/editvacation`, { id: record.key, status: 2 })
        for (var i=0;i<dataSource.length; i++){
            if (dataSource[i].vacation_no == record.vacation_no &&
                dataSource[i].emp_no == record.emp_no &&
                dataSource[i].period == record.period &&
                dataSource[i].key != record.key
            ){
                dataSource[i].status = 1
                axios.post(`/api/editvacation`, { id: dataSource[i].key, status: 1 })
            }
            if (dataSource[i].key == record.key){
                dataSource[i].status = 2
            }
        }
        this.setState({  applications: dataSource});
    }
    denyApplication(record){
        var dataSource = [...this.state.applications];
        axios.post(`/api/editvacation`, { id: record.key, status: 1 })
        for (var i=0;i<dataSource.length; i++){
            if (dataSource[i].key == record.key){
                dataSource[i].status = 1
            }
        }
        this.setState({  applications: dataSource});
    }
    onDelete = (key) => {
        const dataSource = [...this.state.applications];
        axios.post(`/api/deletevacation`, { id: key })
            .then(res => { });
        this.setState({  applications: dataSource.filter(item => item.key !== key) });
    }
    getApplications() {
        var periodID = null;
        if (this.props.vacationperiod !== undefined){
            periodID = this.props.vacationperiod.key;
        }
        axios.get(`/api/getapplications`, { params: { period: periodID } })
            .then(res => {
                var applications = res.data;
                for (var i = 0; i < applications.length; i++) {
                    applications[i] = {
                        status: applications[i].status,
                        choice_no: applications[i].choice_no,
                        description: applications[i].description,
                        emp_no: applications[i].emp_no,
                        created: applications[i].created,
                        start_date: applications[i].start_date,
                        end_date: applications[i].end_date,
                        vacation_no: applications[i].vacation_no,
                        period: applications[i].period,
                        key: applications[i].id,
                    }
                }

                this.setState({ applications });
            })
    }

    onCellChange = (key, dataIndex) => {

        return (value) => {
            const dataSource = [...this.state.staffmembers];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ staffmembers: dataSource });
            }
            axios.post(`/api/editstaffmembers`, { target });
        };
    }


    render() {
        return (
            <div>
                <div>
                    <Table columns={this.columns} dataSource={this.state.applications} />
                </div>
            </div>

        );
    }

}

