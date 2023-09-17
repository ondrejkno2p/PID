import { GOLEM_API_KEY } from '$env/static/private'
export const url_departure_board:string = 'https://api.golemio.cz/v2/pid/departureboards';
export const url_stops:string			= 'https://api.golemio.cz/v2/gtfs/stops'
export const url_stop:string 			= 'https://api.golemio.cz/v2/gtfs/stops/'
export const url_trip:string			= 'https://api.golemio.cz/v2/gtfs/trips/'
export const options = {
	method: 'GET',
	headers: {
		'accept': 'application/json',
		'X-Access-Token': GOLEM_API_KEY,
	},
};