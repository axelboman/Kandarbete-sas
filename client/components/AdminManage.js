import React, { Component } from "react";
import { Button, Grid, Col, ButtonGroup} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';


export default class AdminManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: []
    
        };
    }
    componentDidMount() {
        axios.get(`/api/applications`)
          .then(res => {
            const applications = res.data;
            this.setState({ applications });
          })
    }

    //Onclick handlers for change
    onClickChangeSelected(cell, row, rowIndex){
        console.log('Row #', rowIndex);
        console.log(row);
    }

    //Button for change
    changeButton(cell, row, enumObject, rowIndex) {
        return (
           <Button 
                bsStyle="default"
                bsSize="small" 
                type="button" 
                onClick={() => 
                this.onClickChangeSelected(cell, row, rowIndex)}
           >
           Change 
           {/* row { rowIndex } */}
           </Button>
        )
    }

    //Onclick handlers for Accept or decline
    onClickAcceptSelected(cell, row, rowIndex){
        console.log("Accept");
        console.log(row);

    }
    onClickDeclineSelected(cell, row, rowIndex){
        console.log("Decline"); 
        console.log(row);

    }

    //Button for decisions accept or decline
    decisionButtons(cell, row, enumObject, rowIndex) {
        return (
            <ButtonGroup>
                <Button 
                    bsStyle="success" 
                    type="decision"
                    onClick={() => 
                    this.onClickAcceptSelected(cell, row, rowIndex)}
                >
                Accept
                </Button>
                <Button 
                    bsStyle="danger" 
                    type="decision"
                    onClick={() => 
                    this.onClickDeclineSelected(cell, row, rowIndex)}
                >
                Decline
                </Button>
            </ButtonGroup>
        )
    }

    render() { 
        const options = { 
            exportCSVSeparator: ', ',
            defaultSortOrder: 'asc'
        };
        return(
            <Grid fluid >
                <Col xs={12}>
                    <div className="manageHeader">
                        <h1>Manage Applications</h1>
                    </div>
                    <div> Vacation applications</div>
                    <hr className="manageBreak">
                    </hr> 
                    <BootstrapTable className="table" 
                    data={ this.state.applications } 
                    exportCSV={ true } 
                    options={ options } 
                    bordered={ false }
                    frame
                    striped 
                    search
                    hover 
                    condensed
                    sort={ true }>
                        <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true } hidden={true} csvFieldType='number' >Employee ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='sender' dataSort={ true } csvHeader='sender' width='10%'>Sender</TableHeaderColumn>
                        <TableHeaderColumn dataField='created' dataSort={ true } csvHeader='created' width='10%'>Created</TableHeaderColumn>
                        <TableHeaderColumn dataField='status' dataSort={ true } csvHeader='status' width='10%'>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField='reviewedBy' dataSort={ true } csvHeader='reviewed by' width='10%'>Reviewed by</TableHeaderColumn>
                        <TableHeaderColumn dataField='reviewDate' dataSort={ true } csvHeader='Date of review' width='10%'>Date of Review</TableHeaderColumn>
                        <TableHeaderColumn dataField='description' csvHeader='description' width='10%'>Description</TableHeaderColumn>
                        <TableHeaderColumn dataField='totDays' dataSort={ true } csvFormat={ this.csvTotDaysFormatter } width='10%'>Total number of days</TableHeaderColumn>
                        <TableHeaderColumn dataField='date' dataSort={ true } csvHeader='date' width='10%'>Date</TableHeaderColumn>
                        <TableHeaderColumn width='10%' dataField='decision' dataFormat={this.decisionButtons.bind(this)}>Decision</TableHeaderColumn>    
                        <TableHeaderColumn width='10%' dataField='button' dataFormat={this.changeButton.bind(this)}>Change</TableHeaderColumn>  
                    </BootstrapTable>
                </Col>
            </Grid>
        )   
    }
}    

