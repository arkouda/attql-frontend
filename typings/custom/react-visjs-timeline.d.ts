declare module "react-visjs-timeline" {
    import * as React from 'react';

    export interface Group {
        id: number;
        content: string;
    }

    export interface Item {
        day: number;
        arrivalTime: string;
        departTime: string;
    }

    export interface Items {
        groupid: number;
        items: Item[];
    }

    export interface ITimelineProps {
        options?: object;
        items: object[];
        group: object[];
        selection?: object[];
        customTimes?: object;
    }

    class Timeline extends React.Component {
        // constructor(props:ITimelineProps):any;
        // componentWillMount():any;
        // componentDidMount():any;
        // componentDidUpdate():any;
        // shouldComponentUpdate(nextprops:ITimelineProps):any;
        // init():any;
        // render():any;
    }

};