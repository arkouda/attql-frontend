import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import ReactTable, { Column, FinalState, Instance } from "react-table";
import 'react-table/react-table.css';
import { IHierarchicalProps, IHierarchicalState } from "../Interfaces"
import { buildUrl, hierarchicalViewURL, statify } from "../Helper"
import HierarchicalDetailView from './hierarchicalDetailView';
// import { string, any } from 'prop-types';

export class HierarchicalView extends Component<IHierarchicalProps, IHierarchicalState> {

    constructor(props: IHierarchicalProps) {
        super(props);
        this.state = {
            data: [],
            api_url: hierarchicalViewURL,
            queryParams: { hflag: "day" }
        };
    };

    componentDidMount = () => {
        console.log(buildUrl(this.state.api_url, this.state.queryParams));
        fetch(buildUrl(this.state.api_url, this.state.queryParams))
            .then(result => { return result.json() })
            .then(data => this.setState(statify({ data: data }, this.state)));
    };

    handleChange = (event: React.MouseEvent<HTMLElement>) => {
        const name: string = event.currentTarget.id;
        console.log(name);
        var newQueryParams: any = {};
        newQueryParams['hflag'] = name;
        var newState: any = { queryParams: statify(newQueryParams, this.state.queryParams) };
        // this.setState(statify(newState, this.state) as IHierarchicalState, () => {
        //     console.log(JSON.stringify(this.state));
        // });
        console.log(this.state);
        this.setState(statify({ api_url: buildUrl('http://localhost:3001/hierarchicalview', newQueryParams), queryParams: newQueryParams }, this.state), () => {
            fetch(this.state.api_url)
                .then(result => { return result.json() })
                .then(data => this.setState(statify({ data: data }, this.state)));
        });
    };

    // handleSubmit = () => {
    //     this.setState(statify({ api_url: buildUrl('http://localhost:3001/hierarchicalview', this.state.queryParams) }, this.state), () => {
    //         console.log(this.state.queryParams);
    //         console.log(this.state.api_url);
    //         fetch(this.state.api_url)
    //             .then(result => { return result.json() })
    //             .then(data => this.setState(statify({ data: data }, this.state)));
    //     });
    // };

    render = () => {
        const column1 = [{
            Header: 'Student Id',
            accessor: 'studid',
        }, {
            Header: 'Count',
            accessor: 'count'
        }];

        const column2 = [{
            Header: 'Day',
            accessor: 'day'
        }, {
            Header: 'Count',
            accessor: 'count'
        }];

        return (
            <div>
                <div>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" id='day' onClick={(event: React.MouseEvent<HTMLElement>) => { this.handleChange(event) }}>Day</Button>
                        <Button variant="secondary" id='studid' onClick={(event: React.MouseEvent<HTMLElement>) => { this.handleChange(event) }}>Student ID</Button>
                    </ButtonGroup>
                </div>

                <ReactTable
                    columns={this.state.queryParams.hflag === "day" ? column2 : column1}
                    data={this.state.data}
                    SubComponent={row =>{
                        return(
                            <div>
                                <HierarchicalDetailView
                                 hflag = {this.state.queryParams.hflag}
                                 selected_id={this.state.queryParams.hflag === "day" ? row.original.day : row.original.studid}
                                />
                            </div>
                        );
                    }}
                />

            </div>
        );
    };
}