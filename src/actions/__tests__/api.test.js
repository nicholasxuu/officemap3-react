import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import fetchMock from 'fetch-mock';
import * as actions from '../api';
import * as types from '../../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates FETCH_MAP_DATA_SUCCESS when loadFromApi has been done', () => {
    // todo: change localhost to env variable.
    fetchMock
      .getOnce(
        `${process.env.REACT_APP_SERVER_ADDR}/mockApi/config.json`,
        {
          headers: { 'content-type': 'application/json' },
          body: {
            locations: ['arr.locs'],
            images: ['map.images'],
            settings: ['map.settings'],
          },
        },
      );

    const expectedActions = [
      { type: types.FETCH_MAP_DATA_REQUEST },
      {
        type: types.FETCH_MAP_DATA_SUCCESS,
        mapId: 1,
        locations: Immutable.fromJS(['arr.locs']),
        imageDataCollection: Immutable.fromJS(['map.images']),
        settings: Immutable.fromJS(['map.settings']),
      },
    ];
    const store = mockStore({});

    return store
      .dispatch(actions.loadFromApi())
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates FETCH_MAP_DATA_FAILURE when loadFromApi fails', () => {
    fetchMock
      .getOnce(
        `${process.env.REACT_APP_SERVER_ADDR}/mockApi/config.json`,
        {
          headers: { 'content-type': 'application/json' },
          status: 500,
          body: {
            error: 'str.err',
          },
        },
      );

    const expectedActions = [
      { type: types.FETCH_MAP_DATA_REQUEST },
      {
        type: types.FETCH_MAP_DATA_FAILURE,
        exception: { error: 'str.err' },
      },
    ];
    const store = mockStore({});

    return store
      .dispatch(actions.loadFromApi())
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
