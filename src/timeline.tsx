/// <reference path="../typings/custom/react-visjs-timeline.d.ts" />

import * as Vis from "vis";
import {ITimelineProps, Timeline} from "react-visjs-timeline";
import React from 'react';

export class VisTimeline extends React.Component<ITimelineProps> {
    constructor(props: ITimelineProps) {
        super(props);
    };
    componentWillMount = () => {
        console.log("mai aagya");
        console.log("Timeline", Timeline);
    }

    componentDidMount = () => {
        var container: HTMLElement | null = document.getElementById("timeline");
        var timeline = new Vis.Timeline(container as HTMLElement, this.props.items, this.props.group, this.props.options);
        // console.log("ITimelineProps", ITimelineProps);
    }; 
    render = () => {
        return (
        <div id="timeline">
            <Timeline {...{items: this.props.items, group: this.props.group}} />
        </div>
        );
    }
};