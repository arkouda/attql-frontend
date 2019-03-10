export interface ITabularViewProps {
    pageNo : number,
    rowCount : number
    // handleChange(event: any): void;
}

export interface IState {
    data?: object[],
    queryParams: IQueryParams,
    api_url: string
}

export interface IQueryParams {
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