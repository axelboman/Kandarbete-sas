import React from "react";
import { Switch, Icon, Button, Modal, Form, Input, Radio, DatePicker, Table, Divider, Popconfirm } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new vacation period"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input a period title (e.g Summer 2018)' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Dates">
                            {getFieldDecorator('range_picker', {
                                rules: [{ type: 'array', required: true, message: 'Please select an interval!' }],
                            })(
                                <DatePicker.RangePicker />
                            )}
                        </FormItem>
                        <FormItem className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                initialValue: 'open',
                            })(
                                <Radio.Group>
                                    <Radio value="open">Open</Radio>
                                    <Radio value="closed">Closed</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);


export default class VacationPeriods extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'descend',
  sorter: (a, b) => a.name - b.name,
            // render: (text, record) => (
            //     <EditableCell
            //         value={text}
            //         onChange={this.onCellChange(record.id, 'name')}
            //     />
            // ),
        }, {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: text => <span>{text.slice(0, 10)}</span>,
        }, {
            title: 'End date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: text => <span>{text.slice(0, 10)}</span>,
        }, {
            title: 'Open',
            dataIndex: 'open_status',
            key: 'open_status',
            render: (text, record) => <Switch defaultChecked={text === 1 ? true : false} onChange={(switchValue) => this.onChangeWithId(record.id, switchValue)} />
            // render: text => <span>{
            //     text === 1 ?
            //         'Open' :
            //         'Closed'
            // }</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showOverview(record.id)}>Overview</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">Applications</a>
                    <Divider type="vertical" />
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.id)}>
                        <a href="javascript:;">Delete</a>
                    </Popconfirm>
                </span>
            ),
        }];
        this.state = {
            sitevisibility: true,
            visible: false,
            vacationperiods: null
        };
    }
    showOverview(id) {
        this.setState({ sitevisibility: false });
    }
    componentDidMount() {
        this.getVacationPeriods();
    }
    onChangeWithId(id, checked) {
        var openstatus = null;
        if (checked) {
            openstatus = 1;
        } else {
            openstatus = 0;
        }
        axios.post(`/api/editvacationperiod`, { id: id, openstatus: openstatus });
    }
    getVacationPeriods() {
        axios.get(`/api/getvacationperiods`)
            .then(res => {
                const vacationperiods = res.data;
                this.setState({ vacationperiods });
            })
    }
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values['range_picker'][0] = values['range_picker'][0].format('YYYY-MM-DD');
            values['range_picker'][1] = values['range_picker'][1].format('YYYY-MM-DD');
            if (values['modifier'] === "open") {
                values['modifier'] = 1;
            } else {
                values['modifier'] = 0;
            }
            console.log('Received values of form: ', values);
            axios.post(`/api/createvacationperiod`, values);

            form.resetFields();
            this.setState({ visible: false });
            this.getVacationPeriods();
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    onCellChange = (key, dataIndex) => {

        return (value) => {
            const dataSource = [...this.state.vacationperiods];
            const target = dataSource.find(item => item.id === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ vacationperiods: dataSource });
            }
            axios.post(`/api/editvacationperiod`, { id: key, name: value });
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.vacationperiods];
        axios.post(`/api/deletevacationperiod`, { id: key })
            .then(res => { });
        this.setState({ vacationperiods: dataSource.filter(item => item.id !== key) });
    }

    render() {
        return (
            <div>
                {this.state.sitevisibility ?
                    <div>
                        <Button className="editable-add-btn" type="primary" onClick={this.showModal}>Create new vacation period</Button>
                        <CollectionCreateForm
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />
                        <Table columns={this.columns} dataSource={this.state.vacationperiods} />
                    </div> : null
                }
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