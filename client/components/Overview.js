import React from "react";
import { Switch, Icon, Button, Modal, Form, Input, Radio, DatePicker, Table, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
const FormItem = Form.Item;

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vacations: null,
            columns: null
        };
    }
    createColumns() {
        const emp_no = {
            title: 'Emp no',
            dataIndex: 'emp_no',
            key: 'emp_no',
            fixed: 'left',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.emp_no - b.emp_no,
        }
        const range = moment.range(moment(this.props.vacationperiod.start_date).format('YYYY-MM-DD'), moment(this.props.vacationperiod.end_date).format('YYYY-MM-DD'));
        const days = Array.from(range.by('days'));
        const formatteddays = days.map(m => m.format('DD'))
        var daysarray = [];
        for (var i=0;i<days.length; i++){
            daysarray[i] ={
                title: days[i].format('DD'),
            dataIndex: days[i].format('YYYY-MM-DD'),
            key: days[i].format('YYYY-MM-DD'),
            children: [{
                title: days[i].format("ddd"),
            }]
  
            }
            console.log(days[i].format('DD'));
        }
        const dates = {
            title: 'Dates',
            children: daysarray
        }
        // const first_name = {
        //     title: 'First name',
        //     dataIndex: 'first_name',
        //     key: 'first_name',
        // }
        // const last_name = {
        //         title: 'Last name',
        //         dataIndex: 'last_name',
        //         key: 'last_name'
        //     }
        // const station = {
        //     title: 'Station',
        //     dataIndex: 'location',
        //     key: 'location'
        // }
        this.setState({ columns: [emp_no, dates] });
    }

    componentDidMount() {
        this.createColumns();
        this.getVacations();

    }
    getVacations() {
        axios.get(`/api/getvacations`, { params: { period: this.props.vacationperiod.key } })
            .then(res => {
                var vacations = res.data;
                for (var i = 0; i < vacations.length; i++) {
                    // var range1 = moment.range(moment(vacations[i].start_date).format('YYYY-MM-DD'), moment(vacations[i].end_date).format('YYYY-MM-DD'));
                    // var days1 = Array.from(range1.by('days'));
                    vacations[i] = {
                        emp_no: vacations[i].emp_no,
                        key: vacations[i].id,
                    }
                }

                this.setState({ vacations });
            })
    }


    render() {

        return (
            <div>
                <Table scroll={ {x: 5500} } columns={this.state.columns} bordered dataSource={this.state.vacations} />
            </div>

        );
    }

}

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}