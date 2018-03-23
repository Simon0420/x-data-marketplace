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
import {ButtonToolbar, ToggleButton, ToggleButtonGroup,Button} from 'react-bootstrap';

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

var datasets = makeData();
var datasetnamesarray = getNames(datasets);
var datasetarray_select = getValueAndLabel(datasets);

function Datatable(props) {
    const columns = props.columns
    const name = props.name
    const integration = props.integration

    var value = props.name === 'dt1' ? integration.state.tablevalue : integration.state.tablevalue2
    var onClick = props.name === 'dt1' ? integration.handleChangerino : integration.handleChangerino2

    const table = columns.map((column) =>
        <ToggleButton value={column} className="togglebutton">  {column}</ToggleButton>
    );

    return (<ButtonToolbar>
                <ToggleButtonGroup vertical type="radio" name={name} value={value} onChange={onClick}>
                    {table}
                </ToggleButtonGroup>
            </ButtonToolbar>);
}

class Integration extends Component {

    constructor (props) {
        super(props);
        this.state = {
            //dropdowns
            selected_select: '',
            selected_select1: '',
            datalist_select: [''],
            datalist_select1: [''],
            data_select: '',
            data_select1: '',
            columns_select: [],
            columns_select1: [],
            //menu
            menuOpen: false,
            //columns
            tablevalue: '',
            tablevalue2: '',
            //rules
            rules: [{ rule: '' }],
            integrationmsg: '',

            existingrules: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange21 = this.handleChange21.bind(this)

        this.handleChangerino = this.handleChangerino.bind(this)
        this.handleChangerino2 = this.handleChangerino2.bind(this)

        this.handleIntegrate = this.handleIntegrate.bind(this)
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


        for(var i = 0; i < datasets.length; i++){
            if(this.state.selected_select.label == datasets[i].name){
                for(var j= 0; j < datasets[i].datatables.length; j++){
                        var rulesstring ='';
                        if(data_select.label == datasets[i].datatables[j].name){
                            for(var k = 0; k < datasets[i].datatables[j].rules.length; k++){
                                rulesstring = rulesstring +' connected with '+datasets[i].datatables[j].rules[k].dataset+', '+
                                    datasets[i].datatables[j].rules[k].datatable+', '+
                                    datasets[i].datatables[j].rules[k].attr+' by rule '+datasets[i].datatables[j].rules[k].rule+'; ';
                            }
                        }
                        this.setState({existingrules: 'Existing integration rules for ' +data_select.label+ ': '+rulesstring});
                }
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

    handleChangerino(value){
        this.setState({tablevalue : value})
    }

    handleChangerino2(value){
        this.setState({tablevalue2 : value})
    }

    handleRuleChange = (idx) => (evt) => {
        const newRules = this.state.rules.map((rules, sidx) => {
            if (idx !== sidx) return rules;
            return { ...rules, rule: evt.target.value };
        });
        this.setState({ rules: newRules });
    }

    handleAddRule = () => {
        this.setState({ rules: this.state.rules.concat([{ rule: '' }]) });
    }

    handleRemoveRule = (idx) => () => {
        this.setState({ rules: this.state.rules.filter((s, sidx) => idx !== sidx) });
    }

    rulesArrayToString(){
        var rules = this.state.rules
        var string = '';
        for(var i = 0; i < rules.length-1; i++){
            if(rules[i] != ''){
                string = string + rules[i].rule + ' and \n'
            }
        }
        string = string + rules[rules.length-1].rule;
        return string;
    }

    handleIntegrate() {
        var value1 = this.state.tablevalue
        var value2 = this.state.tablevalue2
        var rules = this.rulesArrayToString()

        this.setState({ integrationmsg: 'Integrated '+this.state.columns_select[value1]+' with '+this.state.columns_select1[value2]+' according to the rules: '+rules});

        for(var i = 0; i < datasets.length; i++){
            if(this.state.selected_select.label == datasets[i].name){
                for(var j= 0; j < datasets[i].datatables.length; j++){
                    if(this.state.data_select != null){
                        if(this.state.data_select.label == datasets[i].datatables[j].name){
                            for(var k = 0; k < this.state.rules.length; k++){
                                var newRule = {rule: this.state.rules[k].rule, dataset: this.state.selected_select1.label, datatable: this.state.data_select.label, attr: this.state.data_select1}
                                datasets[i].datatables[j].rules.push(newRule);
                            }
                        }
                    }
                }
            }
        }
    }

    getIntegrationRulesOfAnAttr(){
        for(var i = 0; i < datasets.length; i++){
            if(this.state.selected_select.label == datasets[i].name){
                for(var j= 0; j < datasets[i].datatables.length; j++){
                    if(this.state.data_select != null){
                        if(this.state.data_select == datasets[i].datatables[j].name){

                            var rulesstring ='';
                            for(var k = 0; k < datasets[i].datatables[j].rules.length; k++){
                                rulesstring = rulesstring +' connected with '+datasets[i].datatables[j].rules[k].dataset+', '+
                                    datasets[i].datatables[j].rules[k].datatable+', '+
                                    datasets[i].datatables[j].rules[k].attr+' by rule '+datasets[i].datatables[j].rules[k].rule+'; ';
                            }

                            return 'Existing integration rules for ' +this.state.data_select+ ':'+rulesstring;
                        }
                    }
                }
            }
        }
    }

    render() {
        const { selected_select,selected_select1,datalist_select,datalist_select1,data_select,data_select1,columns_select,columns_select1,rules,tablevalue2,tablevalue,integrationmsg,existingrules } = this.state;
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
                                Select attributes to integrate:
                                <div className="integrationdiv">
                                    <br />
                                    <div className="showdiv">
                                        <div className="columns">
                                            {placeHolderValue_select}
                                            <ButtonToolbar>
                                                <ToggleButtonGroup vertical type="radio" name={"dt1"} defaultValue={0} value={tablevalue} onChange={this.handleChangerino}>
                                                    {columns_select.map((column,idx) =>
                                                        <ToggleButton value={idx} className="togglebutton">  {column}</ToggleButton>
                                                    )}
                                                </ToggleButtonGroup>
                                            </ButtonToolbar>
                                        </div>
                                        <div className="columns">
                                            {placeHolderValue_select1}
                                            <ButtonToolbar>
                                                <ToggleButtonGroup vertical type="radio" name={"dt2"} defaultValue={0} value={tablevalue2} onChange={this.handleChangerino2}>
                                                    {columns_select1.map((column, idx) =>
                                                        <ToggleButton value={idx} className="togglebutton">  {column}</ToggleButton>
                                                    )
                                                    }
                                                </ToggleButtonGroup>
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                </div>
                                {existingrules}
                                <div className ="integrationrules">
                                Configure Integration rules
                                    <form>
                                    {this.state.rules.map((rule, idx) => (
                                        <div className="rule">
                                            <input
                                                type="text"
                                                placeholder={`Rule #${idx + 1}`}
                                                value={rules.rule}
                                                onChange={this.handleRuleChange(idx)}
                                            />
                                            <button type="button" onClick={this.handleRemoveRule(idx)} className="small">-</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={this.handleAddRule} className="small">Add Rule</button>
                                    </form>
                                </div>
                                <div className="integrationmenu">
                                    Confirm/Cancel Integration<br/>
                                    <Button className='buttonstyle' onClick={this.handleIntegrate}>  Integrate</Button>
                                    <Button className='buttonstyle' onClick={this.handleCancel}>  Cancel</Button>
                                </div>
                                <div className={"integrationinfo"}>
                                    {integrationmsg}
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