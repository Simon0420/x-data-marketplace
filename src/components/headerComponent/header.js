import React, { Component } from 'react';
import{
    Link
} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    X-Data-Marketplace
                </div>
                <nav>
                    <ul>
                        <li className="first"><Link to="/">Home</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                        <li className="last"><Link to="/Data">Data</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;