import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { ITabularViewProps, ITabularViewState } from "../Interfaces"
import { buildUrl, tabViewURL, statify } from "../Helper"
// import { string, any } from 'prop-types';

export class TabularView extends Component<ITabularViewProps, ITabularViewState> {

    constructor(props: ITabularViewProps) {
        super(props);
        this.state = {
            data: [],
            api_url: tabViewURL,
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
        var newState: any = { queryParams: statify(newQueryParams, this.state.queryParams) };
        this.setState(statify(newState, this.state) as ITabularViewState, () => {
            console.log(JSON.stringify(this.state));
        });

    };

    handleSubmit = () => {
        this.setState(statify({ api_url: buildUrl('http://localhost:3001/tabview', this.state.queryParams) }, this.state), () => {
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
                    <div className="row">
                        <div className="col-sm-1" />
                        <div className="col-sm-2">
                            <input name="rollno_gte" type="number" value={this.state.queryParams.rollno_gte || ''} onChange={this.handleChange} />
                        </div>
                        <label className="col-sm-2"> &lt;=  RollNumber &lt;=  </label>
                        <div className="col-sm-7">
                            <input name="rollno_lte" type="number" value={this.state.queryParams.rollno_lte || ''} onChange={this.handleChange} />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-sm-1" />
                        <div className="col-sm-2">
                        <input name="day_gte" type="number" value={this.state.queryParams.day_gte || ''} onChange={this.handleChange} />
                        </div>
                        <label className="col-sm-2">  &lt;= Day &lt;= </label>
                        <div className="col-sm-7">
                        <input name="day_lte" type="number" value={this.state.queryParams.day_lte || ''} onChange={this.handleChange} />
                        </div>
                    </div>




                    <div className="row">
                        <div className="col-sm-1" />
                        <div className="col-sm-2">
                        <input name="arrivaltime_gte" type="string" value={this.state.queryParams.arrivaltime_gte || ''} onChange={this.handleChange} />
                        </div>
                        <label className="col-sm-2"> &lt;=  ArrivalTime &lt;= </label>
                        <div className="col-sm-7">
                        <input name="arrivaltime_lte" placeholder="AAA" type="string" value={this.state.queryParams.arrivaltime_lte || ''} onChange={this.handleChange} />
                        </div>
                    </div>




                    <div className="row">
                        <div className="col-sm-1" />
                        <div className="col-sm-2">
                        <input name="departuretime_gte" type="string" value={this.state.queryParams.departuretime_gte || ''} onChange={this.handleChange} />
                        </div>
                        <label className="col-sm-2"> &lt;= DepartureTime &lt;=  </label>
                        <div className="col-sm-2">
                        <input name="departuretime_lte" type="string" value={this.state.queryParams.departuretime_lte || ''} onChange={this.handleChange} />
                        </div>
                        <div>
                        <button className="btn warning" type="button" name="Submit" value="Submit" onClick={this.handleSubmit}>Submit</button>

                            </div>
                    </div>



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