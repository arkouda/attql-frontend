import React, { Component } from 'react';
import { VisTimeline } from "../visTimeline";
import "../../node_modules/vis/dist/vis.min.css";
import { ITimelineViewProps, ITimelineViewState, Items, Item } from "../Interfaces"
import { buildUrl, timelineViewURL, statify } from "../Helper"
import moment, { Moment } from "moment";
import {model} from "../protos/out/model";
const axios = require("axios");
const timelineV = model.TimelineView;

export class TimelineView extends Component<ITimelineViewProps, ITimelineViewState> {

    constructor(props: ITimelineViewProps) {
        super(props);
        this.state = {
            data: { items: [], group: [] },
            api_url: timelineViewURL,
            queryParams: {
                dayFrom: 1,
                dayTo: 3,
                limit: 10,
                page: 1
            }
        };
    };

    componentWillMount = () => {
        axios.get(buildUrl(this.state.api_url, this.state.queryParams), {
            responseType: 'arraybuffer'
        })
        .then((res: any) => {
            const data = res.data; 
            const parsed = timelineV.decode(new Uint8Array(data));
            const message = timelineV.toObject(parsed);
            console.log(message);
            return message; 
        })
        .then((data: any) => this.setState(statify({ data: data, renderFlag: true }, this.state)));
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        const value: (number | string) = event.currentTarget.value;
        var newQueryParams: any = {};
        newQueryParams[name] = value == "" ? 0 : parseInt(value);
        var newState: any = { queryParams: statify(newQueryParams, this.state.queryParams) };
        this.setState(statify(newState, this.state) as ITimelineViewState, () => {
            // console.log("TimelineView State HandleChange", JSON.stringify(this.state));
        });
    };

    handleSubmit = () => {
        this.setState(statify({ api_url: timelineViewURL, renderFlag: false }, this.state), () => {
            // console.log("TimelineView QueryParams", this.state.queryParams);
            // console.log("TimelineView API URL", this.state.api_url);
            axios.get(buildUrl(this.state.api_url, this.state.queryParams), {
                responseType: 'arraybuffer'
            })
            .then((res: any) => {
                const data = res.data; 
                const parsed = timelineV.decode(new Uint8Array(data));
                const message = timelineV.toObject(parsed);
                console.log(message);
                return message; 
            })
            .then((data: any)  => this.setState(statify({ data: data, renderFlag: true }, this.state)));
        });
    };

    render = () => {
        var idCounter: number = 0;
        var itemsDataSet: object[] = [];
        // console.log("items", this.state.data.items);
        (this.state.data.items).forEach((itemsObj: Items) => {
            itemsObj.items.forEach((itemObj: Item) => {
                idCounter += 1;
                itemsDataSet.push({
                    id: idCounter,
                    group: itemsObj.groupid,
                    start: (new (moment as any)(itemObj.arrivalTime, 'HH:mm:ss')).add(itemObj.day - 1, 'days').toDate(),
                    end: (new (moment as any)(itemObj.departTime, 'HH:mm:ss')).add(itemObj.day - 1, 'days').toDate(),
                    content: itemObj.arrivalTime + " - " + itemObj.departTime
                });
            });
        });
        var optionStart = new Date();
        optionStart.setDate(optionStart.getDate() - 1);
        var optionEnd = new Date();
        optionEnd.setDate(optionEnd.getDate() + 3);
        // optionEnd.setDate(optionEnd.getDate() + this.state.queryParams.dayTo - this.state.queryParams.dayFrom + 1);
        // console.log(optionStart, optionEnd, this.state.queryParams.dayTo, this.state.queryParams.dayFrom);
        var options = {
            orientation: 'top',
            maxHeight: 500,
            start: optionStart,
            end: optionEnd,
            editable: false,
            // configure: true,
            showCurrentTime: false
        }
        // console.log(this.state);
        // console.log("itemsdataset", itemsDataSet);
        return (
            <div>
                <div className="row">
                    <div className="col-sm-1" />
                    <div className="col-sm-2">
                        <input name="dayFrom" type="number" value={this.state.queryParams.dayFrom || ""} onChange={this.handleChange} />
                    </div>
                    <label className="col-sm-2"> &lt;=  Days &lt;=  </label>
                    <div className="col-sm-3">
                        <input name="dayTo" type="number" value={this.state.queryParams.dayTo || ""} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-info warning" type="button" name="Submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
                <h1></h1>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-4">
                        <label> Students Per Page: </label>
                        <input name="limit" type="number" value={this.state.queryParams.limit || ""} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-3">
                        <label>Page No:</label>
                        <input name="page" type="number" value={this.state.queryParams.page || ""} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-info warning" type="button" name="Submit" value="Submit" onClick={this.handleSubmit}>Load Page</button>
                    </div>
                </div>
                <h1></h1>
                {(this.state.renderFlag === true) && <div>
                    <VisTimeline {...{ group: this.state.data.group, items: itemsDataSet, options: options }} />
                </div>}
            </div>
        );
    };
}