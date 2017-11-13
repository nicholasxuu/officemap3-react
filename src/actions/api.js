import Immutable from 'immutable';
// import fetch from 'isomorphic-fetch';
import 'isomorphic-fetch'; // use this so fetchMock works.

import { FETCH_MAP_DATA_FAILURE, FETCH_MAP_DATA_REQUEST, FETCH_MAP_DATA_SUCCESS } from '../constants/ActionTypes';

export const fetchMapDataRequest = () => ({
  type: FETCH_MAP_DATA_REQUEST,
});

export const fetchMapDataFailure = exception => ({
  type: FETCH_MAP_DATA_FAILURE,
  exception,
});

export const receiveMapData = (mapId, json) => ({
  type: FETCH_MAP_DATA_SUCCESS,
  mapId,
  locations: Immutable.fromJS(json.locations),
  imageDataCollection: Immutable.fromJS(json.images),
  settings: Immutable.fromJS(json.settings),
});

export const loadFromApi = () => (dispatch) => {
  dispatch(fetchMapDataRequest());
  return fetch(`${process.env.REACT_APP_SERVER_ADDR}/mockApi/config.json`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => { throw err; });
      }
      return response.json();
    })
    .then((json) => {
      dispatch(receiveMapData(1, json));
    })
    .catch(ex => dispatch(fetchMapDataFailure(ex)));
};

