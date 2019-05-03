import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { IHierarchicalViewProps, IHierarchicalViewState } from "../Interfaces"
import { buildUrl, hierarchicalViewURL, statify } from "../Helper"
import HierarchicalDetailView from './hierarchicalDetailView';
import { model } from "../protos/out/model"
const axios = require("axios");
const hierarchicalV = model.HierarchicalView;

export class HierarchicalView extends Component<IHierarchicalViewProps, IHierarchicalViewState> {

    constructor(props: IHierarchicalViewProps) {
        super(props);
        this.state = {
            data: [],
            api_url: hierarchicalViewURL,
            queryParams: { hflag: "day" }
        };
    };

    componentDidMount = () => {
        axios.get(buildUrl(this.state.api_url, this.state.queryParams), {
            responseType: 'arraybuffer'
        })
        .then((res: any) => {
            const data = res.data; 
            const parsed = hierarchicalV.decode(new Uint8Array(data));
            const message = hierarchicalV.toObject(parsed);
            const finalData = message['hierarchicalV'];
            return finalData; 
        })
        .then((data: any) => this.setState(statify({ data: data }, this.state)));
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        const value: (number | string) = event.currentTarget.value;
        var newQueryParams: any = {};
        newQueryParams[name] = value;
        var newState: any = { queryParams: statify(newQueryParams, this.state.queryParams) };
        this.setState(statify(newState, this.state) as IHierarchicalViewState, () => {
            // console.log("TabularView State HandleChange", JSON.stringify(this.state));
        });
    };

    handleChange = (event: React.MouseEvent<HTMLElement>) => {
        const name: string = event.currentTarget.id;
        var newQueryParams: any = {};
        newQueryParams['hflag'] = name;
        delete newQueryParams['rollnoORday_lte'];
        delete newQueryParams['rollnoORday_gte']; 
        delete newQueryParams['count_gte'];
        delete newQueryParams['count_lte'];
        var newState: any = { queryParams: statify(newQueryParams, this.state.queryParams) };
        console.log("HierarchicalView State", this.state);
        this.setState(statify({ api_url: 'http://localhost:3001/hierarchicalview', queryParams: newQueryParams }, this.state), () => {
            axios.get(buildUrl(this.state.api_url, newQueryParams)  , {
                responseType: 'arraybuffer'
            })
            .then((res: any) => {
                const data = res.data; 
                const parsed = hierarchicalV.decode(new Uint8Array(data));
                const message = hierarchicalV.toObject(parsed);
                const finalData = message['hierarchicalV'];
                return finalData; 
            })
            .then((data: any)=> this.setState(statify({ data: data }, this.state)));
        });
    };

    handleSubmit = () => {
        axios.get(buildUrl(this.state.api_url, this.state.queryParams)  , {
            responseType: 'arraybuffer'
        })
        .then((res: any) => {
            const data = res.data; 
            const parsed = hierarchicalV.decode(new Uint8Array(data));
            const message = hierarchicalV.toObject(parsed);
            const finalData = message['hierarchicalV'];
            return finalData; 
        })
        .then((data: any)=> this.setState(statify({ data: data }, this.state)));
    };

    render = () => {
        const column1 = [{
            Header: 'Student Id',
            accessor: 'studid',
        }, {
            Header: 'Count (Days)',
            accessor: 'count'
        }];

        const column2 = [{
            Header: 'Day',
            accessor: 'day'
        }, {
            Header: 'Count (Student)',
            accessor: 'count'
        }];

        return (
            <div>
                <div>
                    <div className="row">
                        <div className="col-sm-2">
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary" id='day' onClick={(event: React.MouseEvent<HTMLElement>) => { this.handleChange(event) }}>Day</Button>
                                <Button variant="secondary" id='studid' onClick={(event: React.MouseEvent<HTMLElement>) => { this.handleChange(event) }}>Student ID</Button>
                            </ButtonGroup>
                        </div>
                        <div className="col-sm-2">
                            <input name="rollnoORday_lte" type="number" value={this.state.queryParams.rollnoORday_lte || ''} onChange={this.handleInputChange}/>
                        </div>
                        <label className="col-sm-2"> &lt;=  Studend Id / Day &lt;=  </label>
                        <div className="col-sm-2">
                            <input name="rollnoORday_gte" type="number" value={this.state.queryParams.rollnoORday_gte || ''} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-2">
                            <input name="count_lte" type="number" value={this.state.queryParams.count_lte || ''} onChange={this.handleInputChange}/>
                        </div>
                        <label className="col-sm-2"> &lt;=  Count &lt;=  </label>
                        <div className="col-sm-2">
                            <input name="count_gte" type="number" value={this.state.queryParams.count_gte || ''} onChange={this.handleInputChange}/>
                        </div>
                        <div className="col-sm-1" />
                        <div>
                            <button className="btn btn-info warning" type="button" name="Submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
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