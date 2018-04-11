import React, { Component } from 'react';
import "react-table/react-table.css";
import Toolbar from "../toolbarComponent/toolbar";
import SearchBar from "../headerComponent/searchbar";
import BMenu from "../menuComponent/menu";
import DatasetTable from "../tableComponent/datasetTable";

class Data extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    showSettings (event){
        event.preventDefault();
    }

    render() {
        const { data } = this.state;
        return (
            <div id="toolbarcontainter">
                <Toolbar />
                <div id="outer-container">
                    <BMenu wrap={"page-wrap"} />
                    <main id="page-wrap">
                        <div className="maincontainer">
                            <div className="banner">
                                <h1><i class="ion-stats-bars" aria-hidden="true"></i> Data</h1>
                            </div>
                            <div className="other">
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
                                Search Dataset: <SearchBar />
                                Adv. Search | Settings | Help
                            </div>
                            <br />
                            <DatasetTable />
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Data;