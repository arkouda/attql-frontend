import { Group , Items} from "react-visjs-timeline";

export interface ITabularViewProps {}

export interface ITimelineViewProps {}

export interface ITabularViewState {
    data?: object[],
    queryParams: ITabularViewQueryParams,
    api_url: string
}

export interface ITimelineViewState {
    data: {items: Items[], group: Group[]},
    queryParams: ITimelineViewQueryParams,
    api_url: string
}

export interface ITimelineViewQueryParams {
    dayLimit: number,
    page: number
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