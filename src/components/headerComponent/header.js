import React, { Component } from 'react';
import{
    Link
} from 'react-router-dom';
import SearchBar from "./searchbar";

class Header extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    X-Data-Marketplace
                </div>

                <nav>
                    <ul>
                        <li><i class="ion-ios-search-strong" aria-hidden="true"></i></li>
                        <li><SearchBar/></li>
                        <li className="last">de | en</li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;