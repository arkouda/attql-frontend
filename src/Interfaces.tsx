import { TabularView } from "./pages/tabularView";
import { HierarchicalView } from "./pages/hierarchicalView";
import HierarchicalDetailView from "./pages/hierarchicalDetailView";

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

// Hierarchical View

export interface IHierarchicalViewProps {}

export interface IHierarchicalViewState {
    data?: object[],
    queryParams: IHierarchicalViewQueryParams,
    api_url: string
}

export interface IHierarchicalViewQueryParams {
    hflag: string,
    rollnoORday_lte?: number,
    rollnoORday_gte?: number,
    count_gte?: number,
    count_lte?: number
}

// Hierarchical Detail View

export interface IHierarchicalDetailViewProps {
    hflag : string,
    selected_id : number
}
export interface IHierarchicalDetailViewState {
    data?: object[],
    queryParams: IHierarchicalDetailViewQueryParams,
    api_url: string 
}

export interface IHierarchicalDetailViewQueryParams {
    hflag: string,
    day?: number,
    studid?: number
}

// Timeline View

export interface ITimelineViewProps {}

export interface ITimelineViewState {
    data: {items: Items[], group: Group[]},
    queryParams: ITimelineViewQueryParams,
    api_url: string,
    renderFlag?: Boolean
}

export interface ITimelineViewQueryParams {
    dayFrom: number,
    dayTo: number,
    limit: number,
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