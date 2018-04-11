import React, { Component } from 'react';
import "react-table/react-table.css";
import Toolbar from "../../toolbarComponent/toolbar";
import Select from 'react-select';
import BMenu from "../../menuComponent/menu";

class CentralLocation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value: 'Description here...'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showSettings (event){
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Data description was submitted: ' + this.state.value);
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
                                <h1>Data Characteristics</h1>
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
                                <div className='exchangeable'>
                                    <h2>3. Describe Data</h2>
                                    <p>
                                        <form onSubmit={this.handleSubmit}>
                                            Data-Type:<br/>
                                            <Select
                                                name="data-type"
                                                defaultValue={0}
                                                options={['xml','pdf','excel']}
                                            /><br/>
                                            Dataset-Name:<br/>
                                            <input type="text" name="location" defaultValue="Name..." width={400} /><br/><br/>
                                            Dataset-Description:<br/>
                                            <textarea value={this.state.value} onChange={this.handleChange} />
                                            <br/>
                                            <br/>
                                            <input type="submit" className='link' value=" Submit Description" />
                                        </form>
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

export default CentralLocation;