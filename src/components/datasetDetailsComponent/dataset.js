import React, { Component } from 'react';
import Toolbar from "../toolbarComponent/toolbar";
import SearchBar from "../headerComponent/searchbar";
import BMenu from "../menuComponent/menu";
import DatasetTable from "../tableComponent/datasetTable";


function getDataset(name){
    const data = DatasetTable.datadata;
    for(var i = 0; i < data.length; i++){
        if(data[i].name == name){
            return data[i];
        }
    }
    return null;
}

function DataDetails(props) {
    const name = props.name;
    const dataset = getDataset(name);

    const table = dataset.datatables.map((datatable) =>
        <div className={table}>
            Datatable: {datatable.name}
        </div>
    );

    return (
        <div className="datasetdetails">
            {table}
        </div>
    );
}

class DatasetPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div id="toolbarcontainter">
                <Toolbar />
                <div id="outer-container">
                    <BMenu wrap={"page-wrap"} />
                    <main id="page-wrap">
                        <div className="maincontainer">
                            <div className="banner">
                                <h1><i class="ion-stats-bars" aria-hidden="true"></i> Dataset Details</h1>
                            </div>
                            <div className="other">
                                <h1>{this.props.match.params.value}</h1>
                                Here will be detailed information about the dataset.<br/>
                                Description: {this.props.location.param1}<br/>
                                Type: {this.props.location.param3}<br/>
                                Size: {this.props.location.param2}<br/>
                                Tags: {this.props.location.param1}<br/>
                                <h1>Datatables</h1>
                                ...with different columns and values.<br/>
                                ...in progress...<br/>
                                <h1>Integrations</h1>
                                ...in progress...
                            </div>
                            <br />
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default DatasetPage;