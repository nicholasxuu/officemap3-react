// import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

export const RECEIVE_MAP_DATA = 'RECEIVE_MAP_DATA';
export const receiveMapData = (mapId, json) => {
	return {
		type: RECEIVE_MAP_DATA,
		mapId,
		locations: Immutable.fromJS(json.locations),
		imageData: Immutable.fromJS(json.image),
	}
};

export const loadDummy = () => {
	return function (dispatch) {
		return dispatch(receiveMapData(1, {
			locations: [
				{
					id: 1,
					name: "Theeba Soundararajan",
					description: "software engineer",
					image: "/img/1.jpg",
					mapElementId: "svg_8",
				},
				{
					id: 2,
					name: "name2",
					description

						: "1234567890123456",
					image: "/img/1.jpg",
					mapElementId: "svg_4",
				},
			],
			image: {
				id: 'svg_image_1',
				width: 1400,
				height: 1400,
				url: "/img/weebly_ny.png",
				elements: [
					{
						id: 'svg_8',
						componentName: 'rect',
						height: 60.931406,
						width: 89.898795,
						x: 262.704261,
						y: 604.682895,
						opacity: 0.1,
						stroke: "#000",
						strokeOpacity: null,
						strokeWidth: 0,
						fill: "#fff",
						fillOpacity: null,
					},
					{
						id: 'svg_4',
						componentName: 'path',
						opacity:0.1,
						d: "m159.82008,340.61655l206.76723,-0.99887l0,244.7245l-155.82458,0l-50.94265,-243.72563z",
						fillOpacity: null,
						fill:"#fff",
						strokeOpacity: null,
						strokeWidth: 0,
						stroke:"#000",
					},
				],
			},
		}));
	}
};