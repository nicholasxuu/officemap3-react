// import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

export const RECEIVE_MAP_DATA = 'RECEIVE_MAP_DATA';

export const receiveMapData = (mapId, json) => ({
  type: RECEIVE_MAP_DATA,
  mapId,
  locations: Immutable.fromJS(json.locations),
  imageDataCollection: Immutable.fromJS(json.images),
  settings: Immutable.fromJS(json.settings),
});

export const loadFromApi = () => (dispatch) => {
  const localhost = '';
  return fetch(`${localhost}/mockApi/config.json`)
    .then(response =>
      response.json())
    .then(json =>
      dispatch(receiveMapData(1, json)));
};

