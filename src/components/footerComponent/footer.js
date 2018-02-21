import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footercontent">
                <div className="footerbox">
                    <ul>
                        <li className ="first">Community</li>
                        <li>Contact</li>
                        <li>Socials</li>
                    </ul>
                </div>
                <div class="vl"></div>
                <div className="footerbox">
                    <ul>
                        <li className ="first">Ressource</li>
                        <li>Support</li>
                        <li>Training</li>
                    </ul>
                </div>
                <div class="vl"></div>
                <div className="footerbox">
                    <ul>
                        <li className ="first">About</li>
                        <li>Project</li>
                        <li>Team</li>
                    </ul>
                </div>
                <div class="vl"></div>
                <div className="footerbox" >
                    <ul>
                        <li className ="first">Legal</li>
                        <li>Security Policies</li>
                        <li>Terms of Use</li>
                    </ul>
                </div>
                </div>
                <div className="floatbreak"></div>
                <div className="creditsgithub">
                    <span><a href="https://github.com/Simon0420" rel="author">Designed &amp; developed by Simon Beckmann</a></span>
                    <span><a href="https://github.com/Simon0420/x-data-marketplace" title="View Github Repo"><i class="icon ion-social-github" aria-hidden="true"></i> View Code</a></span>
                </div>
            </footer>
        );
    }
}

export default Footer;