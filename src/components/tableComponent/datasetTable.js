import React, { Component } from 'react';
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import {makeData, Logo, Tips} from "../utils/tableutils";
import DatasetPage from "../datasetDetailsComponent/dataset";
import{
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import "react-table/react-table.css";
import Toolbar from "../toolbarComponent/toolbar";
import SearchBar from "../headerComponent/searchbar";
import BMenu from "../menuComponent/menu";


const columns =
    [
        {
            Header: "Dataset",
            columns: [
                {
                    Header: "Name",
                    accessor: "name",
                    Footer: () => <div style={{ textAlign: "center" }}>Name</div>,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["name"] }),
                    filterAll: true
                },
                {
                    Header: "Description",
                    accessor: "tags",
                    Footer: () => <div style={{ textAlign: "center" }}>Description</div>,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["tags"] }),
                    filterAll: true
                },
                {
                    Header: "Type",
                    accessor: "type",
                    Footer: () => <div style={{ textAlign: "center" }}>Type</div>,
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "pdf") {
                            return row[filter.id] === "pdf";
                        }
                        if (filter.value === "excel") {
                            return row[filter.id] === "excel";
                        }
                        if (filter.value === "xml") {
                            return row[filter.id] === "xml";
                        }
                    },
                    Filter: ({ filter, onChange }) =>
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">all</option>
                            <option value="pdf">pdf</option>
                            <option value="excel">excel</option>
                            <option value="xml">xml</option>
                        </select>
                },
                {
                    Header: "Size",
                    accessor: "size",
                    Footer: () => <div style={{ textAlign: "center" }}>Size</div>,
                    filterMethod: (filter, row) =>
                        row[filter.id].startsWith(filter.value) &&
                        row[filter.id].endsWith(filter.value)
                },
                {
                    Header: "Tags",
                    accessor: "tags",
                    Footer: () => <div style={{ textAlign: "center" }}>Tags</div>,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["tags"] }),
                    filterAll: true
                },
                {
                    expander: true,
                    Header: () => <strong>More</strong>,
                    width: 65,
                    Expander: ({ isExpanded, ...rest }) =>
                        <div>
                            {isExpanded
                                ? <span>&#x2299;</span>
                                : <span>&#x2295;</span>}
                        </div>,
                    style: {
                        cursor: "pointer",
                        fontSize: 25,
                        padding: "0",
                        textAlign: "center",
                        userSelect: "none"
                    },
                    Footer: () => <span>&hearts;</span>
                }
            ]
        }
    ];

class DatasetTable extends Component {

    static datadata;

    static getData() {
        return this.datadata;
    }

    constructor (props) {
        super(props)
        this.datadata = makeData();
        this.state = {
            data: this.datadata
        }
    }

    render() {
        return (
            <div className="table">
                <ReactTable
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                console.log('A Td Element was clicked!')
                                console.log('it produced this event:', e)
                                console.log('It was in this column:', column)
                                console.log('It was in this row:', rowInfo)
                                console.log('It was in this table instance:', instance)

                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler will override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                if (handleOriginal) {
                                    handleOriginal()
                                }
                            }
                        }
                    }}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    data={this.state.data}
                    columns={columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return (
                            <div style={{padding: '15px'}}>

                                <h2>Details {row.row.name}</h2>
                                some details here...<br />
                                More information: <Link to={{
                                pathname: `/data/${ row.row.name }`,
                                param1: `${ row.row.tags }`,
                                param2: `${ row.row.size }`,
                                param3: `${ row.row.type }`,
                            }}>details</Link>
                            </div>
                        );}}
                />
                <br />
                <Tips />
            </div>
        );
    }
}

export default DatasetTable;