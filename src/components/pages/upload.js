import React, { Component } from 'react';
import "react-table/react-table.css";
import Toolbar from "../toolbarComponent/toolbar";
import{
    Link
} from 'react-router-dom';
import BMenu from "../menuComponent/menu";

class Upload extends Component {

    constructor (props) {
        super(props)
        this.state = {
        }
    }

    showSettings (event){
        event.preventDefault();
    }

    render() {
        return (
            <div id="toolbarcontainter">
                <Toolbar />
                <div id="outer-container">
                    <BMenu wrap={"page-wrap"}/>
                    <main id="page-wrap">
                        <div className="maincontainer">
                            <div className="banner">
                                <h1><i class="ion-upload" aria-hidden="true"></i> Upload</h1>
                            </div>
                            <div className="other">
                                <h1>Data Upload</h1>
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
                                    <div className='exchangeable'>
                                        <h2>1. Choose upload type</h2>
                                        <p>
                                            There are two types of uploads: central and decentral upload...
                                        </p>
                                        <p>
                                        <Link to="/upload/central" className='link'><i class="ion-ios-cloud-upload" aria-hidden="true"></i> Central </Link>
                                        <Link to="/upload/dynamic" className='link'><i class="ion-ios-cloud-upload-outline" aria-hidden="true"></i> Decentral </Link>
                                        </p>
                                    </div>
                            </div>
                            <br />
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Upload;