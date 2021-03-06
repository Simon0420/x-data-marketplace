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
import BMenu from "../menuComponent/menu";

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

function DatatableVisual(props) {
    const columns = props.columns
    const name = props.name
    const integration = props.integration

    var value = props.name === 'dt1' ? integration.state.tablevalue : integration.state.tablevalue2
    var onClick = props.name === 'dt1' ? integration.handleAttributeButtonChange : integration.handleAttributeButtonChange2

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
            //---dropdowns---

            //selected datasets 1 & 2
            selected_select: '',
            selected_select1: '',

            //options for selected datasets [data]
            datalist_select: [''],
            datalist_select1: [''],

            //selected data 1 & 2
            data_select: '',
            data_select1: '',

            //options for selected data [attributes]
            columns_select: [],
            columns_select1: [],

            //---visual columns---
            tablevalue: '',
            tablevalue2: '',

            //---rules---
            rules: [{ rule: '' }],
            integrationmsg: '',

            existingrules: '',
            existingrules1: '',

            //---integrations[]---
            integrations:[{datasetA:'setA', dataA:'dataA', attrA:'attrA', datasetB:'setB', dataB:'dataB', attrB:'attrB', rules:[{rule:''}]}],
        }

        this.handleDatasetSelectChange = this.handleDatasetSelectChange.bind(this)
        this.handleDatasetSelectChange1 = this.handleDatasetSelectChange1.bind(this)

        this.handleDataSelectChange = this.handleDataSelectChange.bind(this)
        this.handleDataSelectChange1 = this.handleDataSelectChange1.bind(this)

        this.handleAttributeButtonChange = this.handleAttributeButtonChange.bind(this)
        this.handleAttributeButtonChange2 = this.handleAttributeButtonChange2.bind(this)

        this.handleIntegrate = this.handleIntegrate.bind(this)
    }

    showSettings (event){
        event.preventDefault();
    }

    handleDatasetSelectChange = (selected_select) => {
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

    handleDatasetSelectChange1 = (selected_select1) => {
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

    handleDataSelectChange = (data_select) => {
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

        var rulesstring ='';
        for(var i = 0; i < this.state.integrations.length; i++){
            if(this.state.integrations[i].datasetA == this.state.selected_select.label){
                if(this.state.integrations[i].dataA == data_select.label){
                    rulesstring = rulesstring +'Attribute '+this.state.integrations[i].attrA+' connected with '+this.state.integrations[i].datasetB+', '+
                        this.state.integrations[i].dataB+', '+this.state.integrations[i].attrB+', by rules: ';
                    for(var k = 0; k < this.state.integrations[i].rules.length-1; k++){
                        rulesstring = rulesstring + this.state.integrations[i].rules[k].rule+', ';
                    }
                    rulesstring = rulesstring + this.state.integrations[i].rules[this.state.integrations[i].rules.length-1].rule+'; ';
                }
            }
            if(this.state.integrations[i].datasetB == this.state.selected_select.label){
                if(this.state.integrations[i].dataB == data_select.label){
                    rulesstring = rulesstring +'Attribute '+this.state.integrations[i].attrB+' connected with '+this.state.integrations[i].datasetA+', '+
                        this.state.integrations[i].dataA+', '+this.state.integrations[i].attrA+', by rules: ';
                    for(var k = 0; k < this.state.integrations[i].rules.length-1; k++){
                        rulesstring = rulesstring + this.state.integrations[i].rules[k].rule+', ';
                    }
                    rulesstring = rulesstring + this.state.integrations[i].rules[this.state.integrations[i].rules.length-1].rule+'; ';
                }
            }
        }
        this.setState({existingrules: 'Existing integration rules for ' +data_select.label+ ': '+rulesstring});
    }

    handleDataSelectChange1 = (data_select1) => {
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

        var rulesstring ='';
        for(var i = 0; i < this.state.integrations.length; i++){
            if(this.state.integrations[i].datasetA == this.state.selected_select1.label){
                if(this.state.integrations[i].dataA == data_select1.label){
                    rulesstring = rulesstring +'Attribute '+this.state.integrations[i].attrA+' connected with '+this.state.integrations[i].datasetB+', '+
                        this.state.integrations[i].dataB+', '+this.state.integrations[i].attrB+', by rules: ';
                    for(var k = 0; k < this.state.integrations[i].rules.length-1; k++){
                        rulesstring = rulesstring + this.state.integrations[i].rules[k].rule+', ';
                    }
                    rulesstring = rulesstring + this.state.integrations[i].rules[this.state.integrations[i].rules.length-1].rule+'; ';
                }
            }
            if(this.state.integrations[i].datasetB == this.state.selected_select1.label){
                if(this.state.integrations[i].dataB == data_select1.label){
                    rulesstring = rulesstring +'Attribute '+this.state.integrations[i].attrB+' connected with '+this.state.integrations[i].datasetA+', '+
                        this.state.integrations[i].dataA+', '+this.state.integrations[i].attrA+', by rules: ';
                    for(var k = 0; k < this.state.integrations[i].rules.length-1; k++){
                        rulesstring = rulesstring + this.state.integrations[i].rules[k].rule+', ';
                    }
                    rulesstring = rulesstring + this.state.integrations[i].rules[this.state.integrations[i].rules.length-1].rule+'; ';
                }
            }
        }
        this.setState({existingrules1: 'Existing integration rules for ' +data_select1.label+ ': '+rulesstring});
    }

    handleAttributeButtonChange(value){
        this.setState({tablevalue : value})
    }

    handleAttributeButtonChange2(value){
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

        this.setState({ integrations: this.state.integrations.concat([{datasetA:this.state.selected_select.label, dataA:this.state.data_select.label, datasetB:this.state.selected_select1.label, dataB:this.state.data_select1.label, attrA:this.state.columns_select[this.state.tablevalue], attrB:this.state.columns_select1[this.state.tablevalue2], rules:this.state.rules}])})
    }


    render() {
        const { selected_select,selected_select1,datalist_select,datalist_select1,data_select,data_select1,columns_select,columns_select1,rules,tablevalue2,tablevalue,integrationmsg,existingrules,existingrules1 } = this.state;
        const placeHolderValue_select = typeof this.state.data_select === 'string' ? this.state.data_select : this.state.data_select.label
        const placeHolderValue_select1 = typeof this.state.data_select1 === 'string' ? this.state.data_select1 : this.state.data_select1.label

        return (
            <div id="toolbarcontainter">
                <Toolbar />
                <div id="outer-container">
                    <BMenu wrap={"page-wrap"} />
                    <main id="page-wrap">
                        <div className="maincontainer">
                            <div className="banner">
                                <h1><i class="ion-shuffle" aria-hidden="true"></i> Integration</h1>
                            </div>
                            <div className="other">
                                <p>
                                    "The world is being re-shaped by the convergence of social, mobile, cloud, big data, community and other powerful forces. The combination of these technologies unlocks an incredible opportunity to connect everything together in a new way and is dramatically transforming the way we live and work."
                                    - Marc Benioff
                                </p>
                                <h3>Dataset-Integration</h3>
                                <div className ='dataselection_overall'>
                                <div className='datasetselection first' >
                                    1st Dataset
                                    <Select
                                        name="dataset-a"
                                        value={selected_select}
                                        onChange={this.handleDatasetSelectChange}
                                        options={datasetarray_select}
                                    />
                                    Data
                                    <Select
                                        name="data-a"
                                        value={data_select}
                                        onChange={this.handleDataSelectChange}
                                        options={datalist_select}
                                    />
                                </div>
                                <div className='datasetselection'>
                                    2nd Dataset
                                    <Select
                                        name="dataset-b"
                                        value={selected_select1}
                                        onChange={this.handleDatasetSelectChange1}
                                        options={datasetarray_select}
                                    />
                                    Data
                                    <Select
                                        name="data-b"
                                        value={data_select1}
                                        onChange={this.handleDataSelectChange1}
                                        options={datalist_select1}
                                    />
                                </div>
                                    <div className='rules first'>{existingrules}
                                    </div>
                                    <div className='rules'>{existingrules1}
                                    </div>
                                </div>
                                Select attributes to integrate:
                                <div className="integrationdiv">
                                    <br />
                                    <div className="showdiv">
                                        <div className="columns">
                                            {placeHolderValue_select}
                                            <ButtonToolbar>
                                                <ToggleButtonGroup vertical type="radio" name={"dt1"} defaultValue={0} value={tablevalue} onChange={this.handleAttributeButtonChange}>
                                                    {columns_select.map((column,idx) =>
                                                        <ToggleButton value={idx} className="togglebutton">  {column}</ToggleButton>
                                                    )}
                                                </ToggleButtonGroup>
                                            </ButtonToolbar>
                                        </div>
                                        <div className="columns">
                                            {placeHolderValue_select1}
                                            <ButtonToolbar>
                                                <ToggleButtonGroup vertical type="radio" name={"dt2"} defaultValue={0} value={tablevalue2} onChange={this.handleAttributeButtonChange2}>
                                                    {columns_select1.map((column, idx) =>
                                                        <ToggleButton value={idx} className="togglebutton">  {column}</ToggleButton>
                                                    )
                                                    }
                                                </ToggleButtonGroup>
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                </div>
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