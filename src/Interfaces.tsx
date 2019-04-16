import { TabularView } from "./pages/tabularView";

// VisTimeline typings

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

export interface IVisTimelineProps {
    options?: object;
    items: object[];
    group: object[];
    selection?: object[];
    customTimes?: object;
    animate?: object;
    currentTime?: object;
}

// Module Typings ////////////////////

// Timeline View

export interface ITimelineViewProps {}

export interface ITimelineViewState {
    data: {items: Items[], group: Group[]},
    queryParams: ITimelineViewQueryParams,
    api_url: string,
    renderFlag?: Boolean
}

export interface ITimelineViewQueryParams {
    dayLimit: number,
    page: number
}

// Tabular View

export interface ITabularViewProps {}

export interface ITabularViewState {
    data?: object[],
    queryParams: ITabularViewQueryParams,
    api_url: string
}

export interface ITabularViewQueryParams {
    rollno_gte? : number,
    rollno_lte? : number,
    day_gte? : number,
    day_lte? : number,
    arrivaltime_gte? : string,
    arrivaltime_lte? : string,
    departuretime_gte? : string,
    departuretime_lte? : string,
    limit: number,
    offset: number,
    page: number
}