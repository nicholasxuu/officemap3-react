// import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

export const RECEIVE_MAP_DATA = 'RECEIVE_MAP_DATA';
export const receiveMapData = (mapId, json) => {
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
		const localhost = 'http://officemap.460b.intern.weebly.net/';
		return fetch(localhost + "/api/v3/config/"+_configId)
			.then(response => response.json())
			.then(json =>
				dispatch(receiveMapData(1, json))
			);

	}
};

