import React, { Component } from 'react';
import "react-table/react-table.css";
import Toolbar from "../../toolbarComponent/toolbar";
import{
    Link
} from 'react-router-dom';
import BMenu from "../../menuComponent/menu";

class Central extends Component {
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
                    <BMenu wrap={"page-wrap"}/>
                    <main id="page-wrap">
                        <div className="datacontainer">
                            <div className="banner">
                                <h1><i class="ion-upload" aria-hidden="true"></i> Upload</h1>
                            </div>
                            <div className="other">
                                <h1>Central Dataupload</h1>
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
                                <div className='exchangeable'>
                                    <h2>2. Choose Dataset location</h2>
                                    <p>
                                        Provide the link to the dataset:<br/>
                                        <input type="text" name="location" defaultValue="http://..." width={400} />
                                    </p>
                                    <p>
                                        <Link to="/upload/central/description" className='link'><i class="ion-android-compass" aria-hidden="true"></i> Confirm Location </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Central;