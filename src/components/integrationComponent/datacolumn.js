import React, { Component } from 'react';

class Datacolumn extends Component {
    render() {
        const columns = this.props.columns
        const table = columns.map((column) =>
            <card>
                ''+{column}
            </card>
        );

        return {table};
    }
}

export default Datacolumn;