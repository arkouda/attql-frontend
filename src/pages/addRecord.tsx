import React from 'react';
import { buildUrl, statify, addRecordViewURL } from "../Helper"
import { IAddRecordViewProps, IAddRecordViewState } from '../Interfaces';

export class AddRecordView extends React.Component<IAddRecordViewProps, IAddRecordViewState> {
    constructor(props: IAddRecordViewProps) {
        super(props);
        this.state = {
            api_url: addRecordViewURL,
            timeSegmented: {
                arrivalHH: 0,
                arrivalMM: 0,
                arrivalSS: 0,
                departHH: 0,
                departMM: 0,
                departSS: 0
            },
            attParams: {
                day: 0,
                studid: 0,
                arrivalTime: "0",
                departTime: "0"
            }
        };
    };

    handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        const value: (number | string) = event.currentTarget.value;
        var newTimeSegmented: any = {};
        newTimeSegmented[name] = value;
        var newState: any = { timeSegmented: statify(newTimeSegmented, this.state.timeSegmented) };
        this.setState(statify(newState, this.state) as IAddRecordViewState, () => {
            console.log("AddRecordView State HandleChange", JSON.stringify(this.state));
        });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        const value: (number | string) = event.currentTarget.value;
        var newAttParams: any = {};
        newAttParams[name] = value;
        var newState: any = { attParams: statify(newAttParams, this.state.attParams) };
        this.setState(statify(newState, this.state) as IAddRecordViewState, () => {
            console.log("AddRecordView State HandleChange", JSON.stringify(this.state));
        });
    };

    handleSubmit = () => {
        const arrivalTime = this.state.timeSegmented.arrivalHH + ":" + this.state.timeSegmented.arrivalHH + ":" + this.state.timeSegmented.arrivalSS;
        const departTime = this.state.timeSegmented.departHH + ":" + this.state.timeSegmented.departMM + ":" + this.state.timeSegmented.departSS;
        this.setState(statify(
            {
                attParams: {
                    arrivalTime: arrivalTime,
                    departTime: departTime,
                    day: this.state.attParams.day,
                    studid: this.state.attParams.studid
                }
            }, this.state), () => {
                this.setState(statify({ api_url: buildUrl(addRecordViewURL, this.state.attParams) }, this.state), () => {
                    console.log("AddRecordView AttParams", this.state.attParams);
                    console.log("AddRecordView API URL", this.state.api_url);
                    fetch(this.state.api_url)
                        .then(result => { return result.json() })
                        .then(res => {
                            if (res.status == 200) {
                                alert("Record Added Successfully");
                            } else {
                                alert("status: " + res.status + "\nerrorMessage: " + res.error.message);
                            }
                        });
                });
            });
    };


    render = () => {
        const alreadyExistsFlag = false;
        return (
            <div>
                <div id="FiltersDiv">
                    <br />
                    <div className="row">
                        <div className="col-sm-1" />
                        <div className="col-sm-2">
                            <label>Day</label>
                        </div>
                        <div className="col-sm-2">
                            <label>Student ID</label>
                        </div>
                        <div className="col-sm-2">
                            <label>HH:MM:SS</label>
                        </div>
                        <div className="col-sm-2">
                            <label>HH:MM:SS</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1" />
                        <div className="col-sm-2">
                            <input name="day" type="number" value={this.state.attParams.day || ''} onChange={this.handleChange} />
                        </div>
                        <div className="col-xs-2">
                            <input name="studid" type="number" value={this.state.attParams.studid || ''} onChange={this.handleChange}/>
                        </div>
                        <div className="col-sm-2">
                            <input name="arrivalHH" type="number" value={this.state.timeSegmented.arrivalHH || ''} onChange={this.handleTimeChange} /> :
                            <input name="arrivalMM" type="number" value={this.state.timeSegmented.arrivalMM || ''} onChange={this.handleTimeChange} /> :
                            <input name="arrivalSS" type="number" value={this.state.timeSegmented.arrivalSS || ''} onChange={this.handleTimeChange} />
                        </div>
                        <div className="col-sm-2">
                            <input name="departHH" type="number" value={this.state.timeSegmented.departHH || ''} onChange={this.handleTimeChange} /> :
                            <input name="departMM" type="number" value={this.state.timeSegmented.departMM || ''} onChange={this.handleTimeChange} /> :
                            <input name="departSS" type="number" value={this.state.timeSegmented.departSS || ''} onChange={this.handleTimeChange} />
                        </div>
                        <button className="btn btn-info warning" type="button" name="Submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}