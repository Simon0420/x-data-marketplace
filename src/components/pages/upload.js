import React, { Component } from 'react';
import { makeData, Logo, Tips } from "../utils/tableutils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Toolbar from "../toolbarComponent/toolbar";
import { slide as Menu } from 'react-burger-menu'
import SearchBar from "../headerComponent/searchbar";
import matchSorter from 'match-sorter'

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

class Upload extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data: makeData(),
            menuOpen: false
        }
    }

    showSettings (event){
        event.preventDefault();
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
        this.setState({menuOpen: false})
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    render() {
        const { data } = this.state;
        return (
            <div id="toolbarcontainter">
                <Toolbar />
                <div id="outer-container">
                    <Menu styles={ styles } noOverlay className="menucontent" pageWrapId="page-wrap" >
                        <p>Navigation</p>
                        <a id="home" className="menu-item" href="/overview"><i class="ion-home" aria-hidden="true"></i> Home</a>
                        <a id="market" className="menu-item" href="/market"><i class="ion-bag" aria-hidden="true"></i> Market</a>
                        <a id="data" className="menu-item" href="/data"><i class="ion-stats-bars" aria-hidden="true"></i> My Data</a>
                        <a id="integration" className="menu-item" href="/integration"><i class="ion-shuffle" aria-hidden="true"></i> Integration</a>
                        <a id="upload" className="menu-item" href="/upload"><i class="ion-upload" aria-hidden="true"></i> Upload</a>
                        <a id="services" className="menu-item--small" href="/services"><i class="ion-star" aria-hidden="true"></i> Services</a>
                    </Menu>
                    <main id="page-wrap">
                        <div className="datacontainer">
                            <div className="banner">
                                <h1><i class="ion-upload" aria-hidden="true"></i> Upload</h1>
                            </div>
                            <div className="other">
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
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