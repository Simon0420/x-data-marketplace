import React, { Component } from 'react';
import {makeData, Logo, Tips, randomArray} from "../utils/tableutils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Toolbar from "../toolbarComponent/toolbar";
import { slide as Menu } from 'react-burger-menu'
import SearchBar from "../headerComponent/searchbar";
import matchSorter from 'match-sorter'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Datacolumn from "../integrationComponent/datacolumn";

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

function getNames(data){
    var list = [];
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        list.push(data[i].name);
    }
    return list;
}

function getValueAndLabel(data){
    var list = [];
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        list.push({value: data[i].name , label: data[i].name});
    }
    return list;
}

function getData(data){
    var list = [];
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        var dataLength = data[i].datatables.length;
        for(var j = 0; j < dataLength; j++){
            list.push(data[i].datatables[j]);
        }
    }
    return list;
}

const datasets = makeData();
const datasetnamesarray = getNames(datasets);

const datasetarray_select = getValueAndLabel(datasets);

function DosSth(props) {
    const columns = props.columns
    const table = columns.map((column) =>
        <card>
            {column}
        </card>
    );

    return table;
}

class Integration extends Component {

    constructor (props) {
        super(props);
        this.state = {
            selected_select: '',
            selected_select1: '',
            datalist_select: [''],
            datalist_select1: [''],
            data_select: '',
            data_select1: '',
            columns_select: [],
            columns_select1: [],
            menuOpen: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange21 = this.handleChange21.bind(this)
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

    /* OLD CODE, KEPT FOR BACKUP REASONS
    _onSelectDataset (option) {
        this.setState({selected: option, data: '', columns: []});
        for(var i = 0; i < datasets.length; i++){
            if(option.label == datasets[i].name){
                        var temp = [];
                for(var j= 0; j < datasets[i].datatables.length; j++){
                    if(datasets[i].datatables[j] != null) {
                        temp.push(datasets[i].datatables[j].name);
                    }
                }
                this.setState({datalist: temp});
            }
        }
    }

    _onSelectDatatable (option) {
        this.setState({data: option});
        for(var i = 0; i < datasets.length; i++){
            if(this.state.selected.label == datasets[i].name){
                var temp = [];
                for(var j= 0; j < datasets[i].datatables.length; j++){
                    if(option.label == datasets[i].datatables[j].name){
                        for(var k = 0; k < datasets[i].datatables[j].columns.length; k++){
                            temp.push(datasets[i].datatables[j].columns[k])
                        }
                    }
                }
                this.setState({columns: temp})
            }
        }
    }*/

    handleChange = (selected_select) => {
        this.setState({ selected_select: selected_select, data_select: '', columns_select: []});
        for(var i = 0; i < datasets.length; i++){
            if(selected_select != null){
                if(selected_select.label == datasets[i].name){
                    var temp = [];
                    for(var j= 0; j < datasets[i].datatables.length; j++){
                        if(datasets[i].datatables[j] != null) {
                            temp.push({value: datasets[i].datatables[j].name , label: datasets[i].datatables[j].name});
                        }
                    }
                    this.setState({datalist_select: temp});
                }
            }
        }
    }

    handleChange1 = (selected_select1) => {
        this.setState({ selected_select1: selected_select1, data_select1: '', columns_select1: []});
        for(var i = 0; i < datasets.length; i++){
            if(selected_select1 != null){
                if(selected_select1.label == datasets[i].name){
                    var temp = [];
                    for(var j= 0; j < datasets[i].datatables.length; j++){
                        if(datasets[i].datatables[j] != null) {
                            temp.push({value: datasets[i].datatables[j].name , label: datasets[i].datatables[j].name});
                        }
                    }
                    this.setState({datalist_select1: temp});
                }
            }
        }
    }

    handleChange2 = (data_select) => {
        this.setState({ data_select });
        for(var i = 0; i < datasets.length; i++){
            if(this.state.selected_select.label == datasets[i].name){
                var temp = [];
                for(var j= 0; j < datasets[i].datatables.length; j++){
                    if(data_select != null){
                        if(data_select.label == datasets[i].datatables[j].name){
                            for(var k = 0; k < datasets[i].datatables[j].columns.length; k++){
                                temp.push(datasets[i].datatables[j].columns[k])
                            }
                        }
                    }
                    else{
                        this.setState({ data_select: '' });
                    }
                }
                this.setState({columns_select: temp})
            }
        }
    }

    handleChange21 = (data_select1) => {
        this.setState({ data_select1: data_select1 });
        for(var i = 0; i < datasets.length; i++){
            if(this.state.selected_select1.label == datasets[i].name){
                var temp = [];
                for(var j= 0; j < datasets[i].datatables.length; j++){
                    if(data_select1 != null){
                        if(data_select1.label == datasets[i].datatables[j].name){
                            for(var k = 0; k < datasets[i].datatables[j].columns.length; k++){
                                temp.push(datasets[i].datatables[j].columns[k])
                            }
                        }
                    }
                    else{
                        this.setState({ data_select1: '' });
                    }
                }
                this.setState({columns_select1: temp})
            }
        }
    }

    render() {
        const { selected_select,selected_select1,datalist_select,datalist_select1,data_select,data_select1,columns_select,columns_select1 } = this.state;
        const placeHolderValue_select = typeof this.state.data_select === 'string' ? this.state.data_select : this.state.data_select.label
        const placeHolderValue_select1 = typeof this.state.data_select1 === 'string' ? this.state.data_select1 : this.state.data_select1.label

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
                                <h1><i class="ion-shuffle" aria-hidden="true"></i> Integration</h1>
                            </div>
                            <div className="other">
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
                                <h3>Dataset-Integration</h3>
                                <div className='datasetselection first' >
                                    1st Dataset
                                    <Select
                                        name="dataset-a"
                                        value={selected_select}
                                        onChange={this.handleChange}
                                        options={datasetarray_select}
                                    />
                                    Data
                                    <Select
                                        name="data-a"
                                        value={data_select}
                                        onChange={this.handleChange2}
                                        options={datalist_select}
                                    />
                                    <br />
                                </div>
                                <div className='datasetselection'>
                                    2nd Dataset
                                    <Select
                                        name="dataset-b"
                                        value={selected_select1}
                                        onChange={this.handleChange1}
                                        options={datasetarray_select}
                                    />
                                    Data
                                    <Select
                                        name="data-b"
                                        value={data_select1}
                                        onChange={this.handleChange21}
                                        options={datalist_select1}
                                    />
                                    <br />
                                </div>
                                <div className='integrationdiv'>
                                    Selected data tables:
                                    <br />
                                    <div className="showdiv">
                                        <div className="columns">
                                            {placeHolderValue_select}
                                            <DosSth columns={columns_select} />
                                        </div>
                                        <div className="columns">
                                            {placeHolderValue_select1}
                                            <DosSth columns={columns_select1} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Integration;