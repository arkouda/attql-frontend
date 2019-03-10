import React, { Component } from 'react';
import * as vis from "vis";
import Timeline from 'react-vis-timeline';
import { ITimelineViewProps, ITimelineViewState } from "../Interfaces"
import { buildUrl, defaultURL, statify } from "../Helper"
import { number, any } from 'prop-types';

export class TimelineView extends Component<ITimelineViewProps, ITimelineViewState> {

    constructor(props: ITimelineViewProps) {
        super(props);
        this.state = {
            data: [],
            api_url: defaultURL,
            queryParams: {
                dayLimit: 10,
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

        var numberOfGroups = 4;
        var groups = new vis.DataSet()
        for (var i = 0; i < numberOfGroups; i++) {
            groups.add({
                id: i,
                content: 'Truck ' + i
            })
        };

        var numberOfItems = 20;
        var items = new vis.DataSet();
        var itemsPerGroup = Math.round(numberOfItems / numberOfGroups);
        for (var truck = 0; truck < numberOfGroups; truck++) {
            var date = new Date();
            for (var order = 0; order < itemsPerGroup; order++) {
                var zeropointtwo : number = 0.2
                date.setHours(date.getHours() + 4 * (Math.random() < zeropointtwo));
                var start = new Date(date);
                date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
                var end = new Date(date);
                items.add({
                    id: order + itemsPerGroup * truck,
                    group: truck,
                    start: start,
                    end: end,
                    content: 'Order ' + order
                });
            }
        };



        return (
            <div>

            </div>
        );
    };
}