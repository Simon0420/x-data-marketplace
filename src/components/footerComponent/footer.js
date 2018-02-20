import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footerbox">
                    Community<br/>
                    <ul>
                        <li>Contact</li>
                        <li>Socials</li>
                    </ul>
                </div>
                <div className="footerbox">
                    Ressources<br/>
                    <ul>
                        <li>Training</li>
                        <li>Support</li>
                    </ul>
                </div>
                <div className="footerbox">
                    About<br/>
                    <ul>
                        <li>Project</li>
                        <li>Team</li>
                    </ul>
                </div>
                <div className="footerbox">
                    Legal<br/>
                    <ul>
                        <li>Terms of Use</li>
                        <li>Copyright</li>
                    </ul>
                </div>
            </footer>
        );
    }
}

export default Footer;