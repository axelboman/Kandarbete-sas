import React from "react";
import { Switch, Icon, Button, Modal, Form, Input, Radio, DatePicker, Table, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid/dist/styles/ag-grid.css';
// import 'ag-grid/dist/styles/ag-theme-balham.css';

const moment = extendMoment(Moment);
const FormItem = Form.Item;

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vacations: null,
            columns: null,
            // columnDefs: [
            //     {headerName: "Make", field: "make"},
            //     {headerName: "Model", field: "model"},
            //     {headerName: "Price", field: "price"}

            // ],
            // rowData: [
            //     {make: "Toyota", model: "Celica", price: 35000},
            //     {make: "Ford", model: "Mondeo", price: 32000},
            //     {make: "Porsche", model: "Boxter", price: 72000}
            // ]
        };
    }
    createColumns() {
        var columns = [];
        const emp_no = {
            title: 'Emp no',
            dataIndex: 'emp_no',
            key: 'emp_no',
            fixed: 'left',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.emp_no - b.emp_no,
        }
        columns.push(emp_no);
        const range = moment.range(moment(this.props.vacationperiod.start_date).format('YYYY-MM-DD'), moment(this.props.vacationperiod.end_date).format('YYYY-MM-DD'));
        const months = Array.from(range.by('months'));
        var monthsarray = [];
        const weeks = Array.from(range.by('weeks'));
        var weeksarray = [];
        for (var i = 0; i < months.length; i++) {
            var weekchildren = [];
            for (var y = 0; y < weekssarray.length; i++) {
                weekchildren.push(weekssarray[i]);
            }
            monthsarray[i] = {
                title: months[i].format('MMM'),
                dataIndex: months[i].format('YYYY/MM'),
                key: months[i].format('YYYY/MM'),
                children: weekchildren
            }
        }
        for (var i = 0; i < weeks.length; i++) {
            var daychildren = [];
            for (var y = 0; y < daysarray.length; i++) {
                if (daysarray[i])
                daychildren.push(daysarray[i]);
            }
            weeksarray[i] = {
                title: weeks[i].format('w'),
                dataIndex: months[i].format('YYYY/w'),
                key: months[i].format('YYYY/w'),
                children: daychildren
            }
        }
        const days = Array.from(range.by('days'));
        // const formatteddays = days.map(m => m.format('DD'))
        var daysarray = [];
        for (var i = 0; i < days.length; i++) {
            daysarray[i] = {
                title: days[i].format('DD'),
                dataIndex: days[i].format('YYYY/MM/DD'),
                key: days[i].format('YYYY/MM/DD'),
                onHeaderCell: (column) => ({

                }),
                children: [{
                    title: days[i].format("ddd"),
                    dataIndex: days[i].format('YYYY-MM-DD'),
                    key: days[i].format('YYYY-MM-DD'),
                    onHeaderCell: (column) => ({
                        className: "test",
                    }),
                    render: (text, record) => <span className={text == 1 ? "dot" : null}></span>,
                    // onCell: (record) =>  ({
                    //     className: "test",
                    //   }),

                }]

            }


        }
        const dates = {
            title: 'Dates',
            children: daysarray
        }
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
                    var range1 = moment.range(moment(vacations[i].start_date).format('YYYY-MM-DD'), moment(vacations[i].end_date).format('YYYY-MM-DD'));
                    var days1 = Array.from(range1.by('days'));

                    vacations[i] = {
                        emp_no: vacations[i].emp_no,
                        key: vacations[i].id,
                    }
                    for (var y = 0; y < days1.length; y++) {
                        vacations[i][days1[y].format('YYYY-MM-DD')] = 1;
                    }
                }

                this.setState({ vacations });
            })
    }


    render() {

        return (
            // <div                  className="ag-theme-balham"
            // style={{ 
            //   height: '500px', 
            //   width: '900px' }} 
            //   >
            //   <AgGridReact
            //        enableSorting={true}
            //        enableFilter={true}
            //        columnDefs={this.state.columnDefs}
            //        rowData={this.state.rowData}>
            //   </AgGridReact>>
            <Table scroll={{ x: 5500 }} columns={this.state.columns} bordered dataSource={this.state.vacations} />
            // </div>

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