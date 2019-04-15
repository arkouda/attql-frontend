import React, { Component } from 'react';
import ReactTable from "react-table";
import { IHierarchicalDetailViewProps, IHierarchicalDetailViewState } from '../Interfaces';
import { buildUrl, hierarchicalDetailViewURL, statify } from "../Helper"

export default class HierarchicalDetailView extends Component<IHierarchicalDetailViewProps, IHierarchicalDetailViewState> {
    constructor(props: IHierarchicalDetailViewProps) {
        super(props);
        this.state = {
            data: [],
            api_url: hierarchicalDetailViewURL,
            queryParams: {
                hflag : this.props.hflag,
                day : this.props.hflag === "day" ? this.props.selected_id : undefined,
                studid : this.props.hflag === "studid" ? this.props.selected_id : undefined
            }
        };

    };
    componentDidMount = () => {
        console.log(buildUrl(this.state.api_url, this.state.queryParams));
        fetch(buildUrl(this.state.api_url, this.state.queryParams))
            .then(result => { return result.json() })
            .then(data => this.setState(statify({ data: data }, this.state)));
    };

    render = () => {
        const column1 = [{
            Header: 'Student Id',
            accessor: 'studid',
        }, {
            Header: 'Arrival Time',
            accessor: 'arrivalTime'
        }, {
            Header: 'Departure Time',
            accessor: 'departTime'
        }
    ];

        const column2 = [{
            Header: 'Day',
            accessor: 'day'
        }, {
            Header: 'Arrival Time',
            accessor: 'arrivalTime'
        }, {
            Header: 'Departure Time',
            accessor: 'departTime'
        }];

        return (
            <div>
                <ReactTable
                    columns={this.state.queryParams.hflag === "day" ? column1 : column2}
                    data={this.state.data}
                />
            </div>
        );
    };
}