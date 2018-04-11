import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import matchSorter from "match-sorter";
import {makeData} from "../utils/tableutils";

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


class BMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            menuOpen: false
        }
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
        return (
            <Menu styles={ styles } noOverlay className="menucontent" pageWrapId= {this.props.wrap} >
                <p>Navigation</p>
                <a id="home" className="menu-item" href="/overview"><i class="ion-home" aria-hidden="true"></i> Home</a>
                <a id="market" className="menu-item" href="/market"><i class="ion-bag" aria-hidden="true"></i> Market</a>
                <a id="data" className="menu-item" href="/data"><i class="ion-stats-bars" aria-hidden="true"></i> My Data</a>
                <a id="integration" className="menu-item" href="/integration"><i class="ion-shuffle" aria-hidden="true"></i> Integration</a>
                <a id="upload" className="menu-item" href="/upload"><i class="ion-upload" aria-hidden="true"></i> Upload</a>
                <a id="services" className="menu-item--small" href="/services"><i class="ion-star" aria-hidden="true"></i> Services</a>
            </Menu>
        );
    }
}

export default BMenu;