import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Grid, Col} from "react-bootstrap";
import axios from 'axios';

const vacation = [{
    id: 1,
    created: "2018-01-31 22:05:16",
    status: "Approved",
    description: "Ski trip",
    totDays: 1,
    date: "2018-01-31",
    delete: "Locked"
  },{    
    id: 2,
    created: "2018-02-01 09:20:39",
    status: "Approved",
    description: "Family vacation",
    totDays: 10,
    date: "2018-02-18 To 2018-02-28",
    delete: "Locked"
  },{
    id: 3,
    created: "2018-03-01 15:25:36",
    status: "Declined",
    description: "Easter",
    totDays: 6,
    date: "2018-03-28 To 2018-04-02",
    delete: "Locked"
}];

export default class Maas extends React.Component {

  csvTotDaysFormatter(cell, row) {
    return `${row.id}: ${cell} days`;
  }


  componentDidMount() {
    axios.get(`/api/myvacations`)
     
  }
  render() {
    const options = { 
        exportCSVSeparator: ', ',
        defaultSortOrder: 'asc'
    };
    return (
      <Grid fluid >
      <Col xs={12}>
                <h1>My Vacations</h1>
                <p>Here you can see status of your upcoming vacation as well as you vacation history</p>
            <hr/>
            <BootstrapTable className="table" 
            data={ vacation } 
            exportCSV={ true } 
            options={ options } 
            bordered={ false }
            frame
            striped 
            search
            hover 
            condensed
            sort={ true }>
                <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true } csvFieldType='number' width='14.3%'>Employee ID</TableHeaderColumn>
                <TableHeaderColumn dataField='created' dataSort={ true } csvHeader='created' width='14.3%'>Created</TableHeaderColumn>
                <TableHeaderColumn dataField='status' dataSort={ true } csvHeader='status' width='14.3%'>Status</TableHeaderColumn>
                <TableHeaderColumn dataField='description' csvHeader='description' width='14.3%'>Description</TableHeaderColumn>
                <TableHeaderColumn dataField='totDays' dataSort={ true } csvFormat={ this.csvTotDaysFormatter } width='14.3%'>Total number of days</TableHeaderColumn>
                <TableHeaderColumn dataField='date' dataSort={ true } csvHeader='date' width='14.3%'>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='delete' width='14.3%'>Delete</TableHeaderColumn>    
            </BootstrapTable>
            </Col>
            </Grid> 
    );
  }
}


//OBS SE HÄR http://allenfang.github.io/react-bootstrap-table/docs.html


