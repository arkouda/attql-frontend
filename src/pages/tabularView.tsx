import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { ITabularViewProps, IState } from "../Interfaces"
import { buildUrl, defaultURL, statify } from "../Helper"
// import { string, any } from 'prop-types';

export class TabularView extends Component<ITabularViewProps, IState> {

    constructor(props: ITabularViewProps) {
        super(props);
        this.state = {
            data: [],
            api_url: defaultURL,
            queryParams: {
                limit: 10,
                offset: 0,
                page: 1
            }
        };
    };

    componentDidMount = () => {
        fetch(buildUrl(this.state.api_url, this.state.queryParams))
            .then(result => { return result.json() })
            .then(data => this.setState(statify({ data: data }, this.state)));
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        const value: (number | string) = event.currentTarget.value;
        var newQueryParams: any = {};
        newQueryParams[name] = value;
        var newState: any = {queryParams: statify(newQueryParams, this.state.queryParams)};
        this.setState(statify(newState, this.state) as IState, () => {
            console.log(JSON.stringify(this.state));
        });

    };

    handleSubmit = () => {
        this.setState(statify({api_url: buildUrl('http://localhost:3001/tabview', this.state.queryParams)}, this.state), () => {
            console.log(this.state.queryParams);
            console.log(this.state.api_url);
            fetch(this.state.api_url)
            .then(result => { return result.json() })
            .then(data => this.setState(statify({ data: data }, this.state)));
        });
    };

    render = () => {
        const columns = [{
            Header: 'Day',
            accessor: 'day'
        }, {
            Header: 'Student Id',
            accessor: 'studid',
        }, {
            Header: 'Arrival Time',
            accessor: 'arrivalTime',
        }, {
            Header: 'Departure Time',
            accessor: 'departTime'
        }];

        return (
            <div>
                <div id="FiltersDiv">
                        <label>
                            RollNoGTE:
                            <input name="rollno_gte" type="number" value={this.state.queryParams.rollno_gte || ''} onChange={this.handleChange} />
                        </label>
                        <button type="button" name="Submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
                </div>
                <div><h1></h1></div>
                <ReactTable
                    columns={columns}
                    data={this.state.data}
                />
            </div>
        );
    };
}