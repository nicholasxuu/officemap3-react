// import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

export const RECEIVE_MAP_DATA = 'RECEIVE_MAP_DATA';
export const receiveMapData = (mapId, json) => {
	return {
		type: RECEIVE_MAP_DATA,
		mapId,
		locations: Immutable.fromJS(json.locations),
		imageDataList: Immutable.fromJS(json.images),
	}
};

export const loadDummy = () => {
	return function (dispatch) {
		return dispatch(receiveMapData(1, {
			locations: [
				{
					id: 1,
					name: "Long name longl ongoandnlg",
					description: "software engineer",
					image: "/img/1.jpg",
					mapElementId: "svg_8",
				},
				{
					id: 2,
					name: "name2",
					description: "human",
					image: "/img/1.jpg",
					mapElementId: "svg_4",
				},
				{
					id: 3,
					name: "lv2 name 1",
					description: "software engineer",
					image: "/img/1.jpg",
					mapElementId: "svg_80",
				},
				{
					id: 4,
					name: "lv2 name 2",
					description: "another human",
					image: "/img/1.jpg",
					mapElementId: "svg_40",
				},
			],
			images: [
				{
					id: 'svg_image_1',
					name: 'lv1',
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
				{
					id: 'svg_image_2',
					name: 'lv2',
					width: 1400,
					height: 1400,
					url: "/img/weebly_ny2.png",
					elements: [
						{
							id: 'svg_80',
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
							id: 'svg_40',
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
			]
		}));
	}
};