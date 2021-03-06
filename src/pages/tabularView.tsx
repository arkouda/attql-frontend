import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { ITabularViewProps, ITabularViewState } from "../Interfaces"
import { buildUrl, tabViewURL, statify } from "../Helper"
import { model } from "../protos/out/model"
const axios = require("axios");
const tabVmodel = model.TabView;

export class TabularView extends Component<ITabularViewProps, ITabularViewState> {

    constructor(props: ITabularViewProps) {
        super(props);
        this.state = {
            data: [],
            api_url: tabViewURL,
            queryParams: {
                limit: 1000,
                offset: 0,
                page: 1
            }
        };
    };

    
    componentDidMount = () => {
        axios.get(buildUrl(this.state.api_url, this.state.queryParams), {
            responseType: 'arraybuffer'
        })
        .then((res: any) => {
            const data = res.data; 
            const parsed = tabVmodel.decode(new Uint8Array(data));
            const message = tabVmodel.toObject(parsed);
            const finalData = message['tabV'];
            return finalData; 
        })
        .then((data: any) => this.setState(statify({ data: data }, this.state)));
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        const value: (number | string) = event.currentTarget.value;
        var newQueryParams: any = {};
        newQueryParams[name] = value;
        var newState: any = { queryParams: statify(newQueryParams, this.state.queryParams) };
        this.setState(statify(newState, this.state) as ITabularViewState, () => {
            // console.log("TabularView State HandleChange", JSON.stringify(this.state));
        });
    };

    handleSubmit = () => {
        this.setState(statify({ api_url: buildUrl(tabViewURL, this.state.queryParams) }, this.state), () => {
            // console.log("TabularView QueryParams", this.state.queryParams);
            // console.log("TabularView API URL", this.state.api_url);
            axios.get(buildUrl(this.state.api_url, this.state.queryParams), {
                responseType: 'arraybuffer'
            })
            .then((res: any) => {
                const data = res.data; 
                const parsed = tabVmodel.decode(new Uint8Array(data));
                const message = tabVmodel.toObject(parsed);
                const finalData = message['tabV'];
                return finalData; 
            })
            .then((data:any) => this.setState(statify({ data: data }, this.state)));
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
                            <input name="arrivaltime_lte" type="string" value={this.state.queryParams.arrivaltime_lte || ''} onChange={this.handleChange} />
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
                            <button className="btn btn-info warning" type="button" name="Submit" value="Submit" onClick={this.handleSubmit}>Submit</button>

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