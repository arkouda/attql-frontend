import React, { Component } from 'react';
import * as vis from "vis";
import { Group, Items, Item } from 'react-visjs-timeline';
import {VisTimeline} from "../timeline";
import { ITimelineViewProps, ITimelineViewState } from "../Interfaces"
import { buildUrl, timelineViewURL, statify } from "../Helper"

export class TimelineView extends Component<ITimelineViewProps, ITimelineViewState> {

    constructor(props: ITimelineViewProps) {
        super(props);
        this.state = {
            data: { items: [], group: [] },
            api_url: timelineViewURL,
            queryParams: {
                dayLimit: 1,
                page: 1
            }
        };
    };

    componentDidMount = () => {
        fetch(buildUrl(this.state.api_url, this.state.queryParams))
            .then(result => { return result.json() })
            .then(data => this.setState(statify({ data: data }, this.state)));
    };

    render = () => {
        var idCounter: number = 0;
        var itemsDataSet: object[] = [];
        (this.state.data.items).forEach((itemsObj: Items) => {
            itemsObj.items.forEach((itemObj: Item) => {
                idCounter += 1;
                itemsDataSet.push({
                    id: idCounter,
                    group: itemsObj.groupid,
                    start: new Date(),//itemObj.arrivalTime),
                    // end: new Date(itemObj.departTime),
                    content: itemObj.arrivalTime + " - " + itemObj.departTime
                });
            });
        });

        return (
            <div>
                <p className="header">
                    Timeline
                </p>
                <VisTimeline {...{group: this.state.data.group , items: itemsDataSet, container: "timeline-react"}} />
            </div>
        );
    };
}