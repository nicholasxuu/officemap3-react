// import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

export const RECEIVE_MAP_DATA = 'RECEIVE_MAP_DATA';
export const receiveMapData = (mapId, json) => {
	console.log(json);
	return {
		type: RECEIVE_MAP_DATA,
		mapId,
		locations: Immutable.fromJS(json.locations),
		imageDataCollection: Immutable.fromJS(json.images),
		settings: Immutable.fromJS(json.settings),
	}
};

const _configId = "1";
export const loadFromApi = () => {
	return function (dispatch) {
		const localhost = location.protocol+'//'+location.hostname;
		return fetch(localhost + "/api/v3/config/"+_configId)
			.then(response => response.json())
			.then(json =>
				dispatch(receiveMapData(1, json))
			);

	}
};

export const loadDummy = () => {
	return function (dispatch) {
		dispatch(receiveMapData(1, {
			settings: {
				defaultImage: '1',
				sidebarType: 'search',
			},
			locations: [
			],
			images: {
				'1': {
					name: 'null',
					width: 2128,
					height: 2128,
					url: "",
					elements: [
					],
				},
			}
		}));
	}
};