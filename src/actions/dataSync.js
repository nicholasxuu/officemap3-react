import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

export const REQUEST_GET = 'REQUEST_GET';
export const requestJson = (mapId) => {
	return {
		type: REQUEST_GET,
		mapId
	}
};

export const RESPOND_GET = 'RESPOND_GET';
export const receiveJson = (mapId, json) => {
	return {
		type: RESPOND_GET,
		mapId,
		locations: Immutable.fromJS(json.locations),
		token: json.token,
	}
};

export const RESPOND_POST = 'RESPOND_POST';
export const respondSync  = (mapId, json, writeToken) => {
	return {
		type: RESPOND_POST,
		mapId,
		invalidToken: !!(json.locations),
		locations: Immutable.fromJS(json.locations),
		token: writeToken,
	}
};

export const fetchJson = (doc_id) => {
	return function (dispatch) {
		return fetch("http://localhost:8000/api/json?doc_id="+doc_id)
			.then(response => response.json())
			.then(json =>
				dispatch(receiveJson(doc_id, json))
			);
	}
};

export const syncJson = (doc_id, lists, token) => {
	return function (dispatch) {
		return fetch("http://localhost:8000/api/json?doc_id="+doc_id, {
				method: "POST",
				body: JSON.stringify({
					token: token,
					json: JSON.stringify(lists),
				}),
			})
			.then(response => response.json())
			.then(json =>
				dispatch(respondSync(doc_id, json, json.token))
			);
	}
};

export const loadDummy = () => {
	return function (dispatch) {
		return dispatch(receiveJson(1, {
			token: 'asdf',
			locations: [
				{
					id: 1,
					name: "name1",
					info: "software engineer",
					image: "http://localhost:3000/img/1.jpg",
				},
				{
					id: 2,
					name: "name2",
					info: "1234567890123456",
					image: "http://localhost:3000/img/1.jpg",
				},
			]
		}));
	}
};