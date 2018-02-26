import React, { Component } from 'react';
import{
    Link
} from 'react-router-dom';
import Overview from "../pages/overview";

class Toolbar extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="toolbar">
                    <nav>
                        <ul>
                            <li><Link to="/Account"><i class="ion-person" aria-hidden="true"></i> Account</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Toolbar;