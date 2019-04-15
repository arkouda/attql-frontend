import React, { Component } from 'react'; 
import {VisTimeline} from "../visTimeline";
import "../../node_modules/vis/dist/vis.min.css";
import { ITimelineViewProps, ITimelineViewState, Items, Item } from "../Interfaces"
import { buildUrl, timelineViewURL, statify } from "../Helper"
import moment, { Moment } from "moment";

export class TimelineView extends Component<ITimelineViewProps, ITimelineViewState> {

    constructor(props: ITimelineViewProps) {
        super(props);
        this.state = {
            data: { items: [], group: [] },
            api_url: timelineViewURL,
            queryParams: {
                dayLimit: 2,
                page: 1
            }
        };
    };

    componentWillMount = () => {
        fetch(buildUrl(this.state.api_url, this.state.queryParams))
            .then(result => { return result.json() })
            .then(data => this.setState(statify({ data: data, renderFlag: true }, this.state)));
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
                    start: (new (moment as any)(itemObj.arrivalTime, 'HH:mm:ss')).toDate(),
                    end: (new (moment as any)(itemObj.departTime, 'HH:mm:ss')).toDate(),
                    content: itemObj.arrivalTime + " - " + itemObj.departTime
                });
            });
        });
        var options = {
            orientation: 'top',
            maxHeight: 400,
            start: new Date(),
            end: new Date(1000*60*60*24 + (new Date()).valueOf()),
            editable: true
        }
        // console.log(this.state);
        // console.log("itemsdataset", itemsDataSet);
        return (
            <div>
                {(this.state.renderFlag === true) && <div>
                    <VisTimeline {...{group: this.state.data.group , items: itemsDataSet, options: options}} />
                </div>}
            </div>
        );
    };
}