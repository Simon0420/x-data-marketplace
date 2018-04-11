import React, { Component } from 'react';
import Toolbar from "../toolbarComponent/toolbar";
import BMenu from "../menuComponent/menu";

class Overview extends Component {
    showSettings (event){
        event.preventDefault();
    }

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
                    <div className="container-fluid">
                        <div className="contentbox">
                            <div className="banner">
                                <i class="ion-home" aria-hidden="true"></i> Home
                                <br/>
                                <br/>
                                <p>Welcome to the X-Data Marketplace.</p>
                            </div>
                            <div className="cards">
                            <div className="card">
                                    <i class="ion-bag" aria-hidden="true"></i>
                                    <div class="container">
                                        <h2>Market</h2>
                                        <p>Description about the Market feature that allows to scroll all provided datasets.</p>
                                    </div>
                            </div>
                            <div className="card">
                                <i class="ion-stats-bars" aria-hidden="true"></i>
                                <div class="container">
                                    <h2>My Data</h2>
                                    <p>Description about the Market feature that allows to scroll all provided datasets.</p>
                                </div>
                            </div>
                            <div className="card">
                                <i class="ion-shuffle" aria-hidden="true"></i>
                                <div class="container">
                                    <h2>Integration</h2>
                                    <p>Description about the Market feature that allows to scroll all provided datasets.</p>
                                </div>
                            </div>
                            <div className="card">
                                <i class="ion-upload" aria-hidden="true"></i>
                                <div class="container">
                                    <h2>Upload</h2>
                                    <p>Description about the Market feature that allows to scroll all provided datasets.</p>
                                </div>
                            </div>
                            <div className="card">
                                <i class="ion-star" aria-hidden="true"></i>
                                <div class="container">
                                    <h2>Services</h2>
                                    <p>Description about the Market feature that allows to scroll all provided datasets.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            </div>
        );
    }
}

export default Overview;