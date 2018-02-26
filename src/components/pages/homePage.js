import React, { Component } from 'react';
import{
    Link
} from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="homescreen">
                    <div className="content">
                        <h1>X-Data-Marketplace</h1>
                        <p>"You can have data without information, but you cannot have information without data" <br /> - Daniel Keys Moran.</p>
                        <ul>
                            <li>
                               <img src={require('../../Assets/icons/login.png')} alt ="login" height="20px" width="20px" /><Link to="/Overview"> Login</Link>
                            </li>
                            <li>
                                |
                            </li>
                            <li>
                                <img src={require('../../Assets/icons/edit.png')} alt ="register" height="20px" width="20px" /><Link to="/Register"> Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;