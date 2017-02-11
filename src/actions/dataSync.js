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
		image: json.image,
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
					mapElementId: "svg_8",
				},
				{
					id: 2,
					name: "name2",
					info: "1234567890123456",
					image: "http://localhost:3000/img/1.jpg",
					mapElementId: "svg_4",
				},
			],
			image: {
				width: 1400,
				height: 1400,
				url: "/img/weebly_ny.png",
				elements: [
					{
						id: 'svg_8',
						type: 'rect',
						height: 60.931406,
						width: 89.898795,
						x: 262.704261,
						y: 604.682895,
						opacity: 0.34,
						strokeColor: "#000",
						strokeOpacity: null,
						strokeWidth: 1.5,
						fillColor: "#fff",
						fillOpacity: null,
					},
					{
						id: 'svg_4',
						type: 'path',
						opacity:0.56,
						d: "m159.82008,340.61655l206.76723,-0.99887l0,244.7245l-155.82458,0l-50.94265,-243.72563z",
						fillOpacity: null,
						fillColor:"#fff",
						strokeOpacity: null,
						strokeWidth: 1.5,
						strokeColor:"#000",
					},
				],
			},
		}));
	}
};