import * as Vis from "vis";
import "../node_modules/vis/dist/vis.min.css";
import {IVisTimelineProps} from "./Interfaces";
import React from 'react';

export class VisTimeline extends React.Component<IVisTimelineProps> {
    // eslint-disable-next-line 
    constructor(props: IVisTimelineProps) {
        super(props);
    };

    componentDidMount = () => {
        var container: HTMLElement | null = document.getElementById("timeline");
        // eslint-disable-next-line 
        var timeline = new Vis.Timeline(container as HTMLElement, this.props.items, this.props.group, this.props.options);
        // console.log("options", this.props.options);
        // console.log("timeline", timeline);
    }; 
    render = () => {
        return (
        <div id="timeline" ref="timeline"></div>
        );
    }
};