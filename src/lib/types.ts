type stop = {
    id: string,
    name: string,
    platform: string,
    lat: number,
    lon: number,
};

type departure = {
    name     : string,
    headsign : string,
    trip_id  : string,
    predicted: Date,
    scheduled: Date,
    minutes  : string,
    delay    : number,
};

type golem_departure = {
    route   : {
        short_name  : string,
    },
    trip    : {
        headsign    : string,
        id          : string,
    },
    departure_timestamp : {
        predicted   : string,
        scheduled   : string,
        minutes     : string,
    },
    arrival_timestamp :  {
        predicted   : string,
        scheduled   : string,
        minutes     : string, 
    },
    delay   : {
         seconds    : number,
    },
};

type golem_stop = {
    properties:{
        stop_id: string,
        stop_name: string,
        platform_code: string,
        location_type: number,
    },
    geometry: {
        coordinates: number[], 
    }, 
}

type departure_board = {
    stop        : stop,
    departures  : Array<departure>,
};

type line = {
    name: string,
    headsign: string,
}

type stop_time = {
    sequence    : number,
    departure   : string,
    arrival     : string,
    stop_id     : string,
    stop_name   : string,
    platform    : string,
}

type golem_stop_time = {
    departure_time: string,
    arrival_time  : string,
    stop_id       : string,
    stop_sequence : number
    stop: {
        properties:{
            stop_name: string,
            platform_code: string,
        },
    },
}

type trip = {
    trip_id :string,
    headsign:string,
    name    :string,
    stop_times: Array<stop_time>,
}