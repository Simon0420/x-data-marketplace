import React from "react";
import namor from "namor";
import { ReactTableDefaults } from 'react-table'

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newDataset = () => {
    const chance = Math.random();
    const sizeunit = chance > 0.66 ? "GB" : chance > 0.33 ? "MB" : "TB";
    return {
        name: namor.generate({ words: 1, numbers: 0 }) + ' dataset',
        size: Math.floor(Math.random() * 100) +' '+ sizeunit,
        tags: namor.generate({ words: 3, numbers: 0 }),
        // beispiel:
        type:
            chance > 0.66
                ? "xml"
                : chance > 0.33 ? "pdf" : "excel",
        datatables: [
            newDatatable(),
            newDatatable(),
            newDatatable()
        ]
    };
};

const newDatatables = () => {
    var random = Array(Math.floor(Math.random()*10)+1);
    const table = random.map((item) =>
            newDatatable(),
    );
    return {table};
}

export function makeData(len = 553) {
    return range(len).map(d => {
        return {
            ...newDataset()
        };
    });
}

const newDatatable = () => {
    const chance = Math.random();
    return {
        name: namor.generate({ words: 1, numbers: 0 }) + ' data',
        columns: [
            namor.generate({ words: 1, numbers: 0 }),
            namor.generate({ words: 1, numbers: 0 }),
            namor.generate({ words: 1, numbers: 0 })
        ],
    };
};


export function randomArray(length) {
    return Array.apply(null, Array(length)).map(function() {
        return namor.generate({ words: 1, numbers: 0 }) + ' dataset'
    });
}

export const Logo = () =>
    <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
        For more examples, visit {''}
        <br />
        <a href="https://github.com/react-tools/react-table" target="_blank">
            <img
                src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
                style={{ width: `150px`, margin: ".5em auto .3em" }}
            />
        </a>
    </div>;

export const Tips = () =>
    <div style={{ textAlign: "center" }}>
        <em>Tip: Hold shift when sorting to multi-sort!</em>
    </div>;