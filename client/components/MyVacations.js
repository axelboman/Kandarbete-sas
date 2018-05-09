import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Grid, Col} from "react-bootstrap";
import axios from 'axios';


export default class Maas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        vacations: []

    };
}

  componentWillMount() {
    axios.get(`/api/myvacations`)
      .then(res => {
        const vacations = res.data;
        this.setState({ vacations });
      })
}
  render() {
    const options = { 
        defaultSortOrder: 'asc'
    };
    return (
      <Grid fluid >
      <Col xs={12}>
                <h1>My Vacations</h1>
                <p>Here you can see status of your upcoming vacation as well as you vacation history</p>
            <hr/>
            <BootstrapTable className="table" 
            data={ this.state.vacations } 
            options={ options } 
            bordered={ false }
            frame
            striped 
            search
            hover 
            condensed
            sort={ true }>
                <TableHeaderColumn dataField='period' isKey={ true } dataSort={ true } width='12.5%'>Period</TableHeaderColumn> 
                <TableHeaderColumn dataField='start_date'  dataSort={ true } width='12.5%'>Start date</TableHeaderColumn>
                <TableHeaderColumn dataField='end_date' dataSort={ true } width='12.5%'>End date</TableHeaderColumn>
                <TableHeaderColumn dataField='choice_no' dataSort={ true } width='12.5%'>Choice no</TableHeaderColumn>
                <TableHeaderColumn dataField='created' dataSort={ true } width='12.5%'>Created</TableHeaderColumn>
                <TableHeaderColumn dataField='status' dataSort={ true } width='12.5%'>Status</TableHeaderColumn>
                <TableHeaderColumn dataField='description' width='12.5%'>Description</TableHeaderColumn>
                <TableHeaderColumn dataField='delete' width='12.5%'>Delete</TableHeaderColumn>    
            </BootstrapTable>
            </Col>
            </Grid> 
    );
  }
}


//OBS SE HÄR http://allenfang.github.io/react-bootstrap-table/docs.html

