
export var clone = (obj: any) => {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};

export const tabViewURL = 'http://localhost:3001/tabview';

export const timelineViewURL = 'http://localhost:3001/timelineview';

export const hierarchicalViewURL = 'http://localhost:3001/hierarchicalView';

export const hierarchicalDetailViewURL = 'http://localhost:3001/hierarchicalViewDetail';

export const addRecordViewURL = 'http://localhost:3001/addRecord';

export var buildUrl = (url: string, parameters: any) => {
    let qs = "";
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            if(''.localeCompare(value) != 0)
                qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
};

export var statify = (newState: any, state: any) => {
    for (var prop in state) {
        if(!newState.hasOwnProperty(prop))
            newState[prop] = state[prop];
    }
    return newState;
}