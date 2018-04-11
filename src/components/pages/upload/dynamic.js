import React, { Component } from 'react';
import { makeData, Logo, Tips } from "../../utils/tableutils";
import "react-table/react-table.css";
import Toolbar from "../../toolbarComponent/toolbar";
import { slide as Menu } from 'react-burger-menu'
import{
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import BMenu from "../../menuComponent/menu";

var styles = {
    bmBurgerButton: {
        position: 'absolute',
        width: '24px',
        height: '20px',
        left: '15px',
        top: '60px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        background: '#373737',
        padding: '1em 1.5em 0',
        fontSize: '1.15em',
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    },
}

class Dynamic extends Component {
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

        function handleChange(event){
            console.log('Selected file:', event.target.files[0]);
        }

        return (
            <div id="toolbarcontainter">
                <Toolbar />
                <div id="outer-container">
                    <BMenu wrap={"page-wrap"} />
                    <main id="page-wrap">
                        <div className="datacontainer">
                            <div className="banner">
                                <h1><i class="ion-upload" aria-hidden="true"></i> Upload</h1>
                            </div>
                            <div className="other">
                                <h1>Decentral Dataupload</h1>
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
                                <div className='exchangeable'>
                                    <div className='exchangeable'>
                                        <h2>2. Choose Dataset location</h2>
                                        <p>
                                            Choose the dataset to upload:<br/>
                                            <input type="file" />
                                            <br/>
                                        </p>
                                        <p>
                                            <Link to="/upload/central/description" className='link'><i class="ion-android-compass" aria-hidden="true"></i> Upload Dataset </Link>
                                        </p>
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

export default Dynamic;