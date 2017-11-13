/* eslint-disable function-paren-newline */
import Immutable from 'immutable';
import reducer from '../mapHoverData';
import * as types from '../../constants/ActionTypes';

describe('mapHoverData reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        Immutable.fromJS({
          locationObj: {},
          clientPosX: 0,
          clientPosY: 0,
        }),
      );
  });

  it('should handle MAP_SHOW_HOVERTIP', () => {
    expect(
      reducer(undefined, {
        type: types.MAP_SHOW_HOVERTIP,
        locationObj: Immutable.fromJS({
          id: 123,
          name: 'loc.name1',
        }),
      }),
    ).toEqual(Immutable.fromJS({
      locationObj: Immutable.fromJS({
        id: 123,
        name: 'loc.name1',
      }),
      clientPosX: 0,
      clientPosY: 0,
    }));

    expect(
      reducer(
        Immutable.fromJS({
          locationObj: Immutable.fromJS({
            id: 123,
            name: 'loc.name1',
          }),
          clientPosX: 0,
          clientPosY: 0,
        }),
        {
          type: types.MAP_SHOW_HOVERTIP,
          locationObj: Immutable.fromJS({
            id: 456,
            name: 'loc.name2',
          }),
        },
      ),
    ).toEqual(Immutable.fromJS({
      locationObj: Immutable.fromJS({
        id: 456,
        name: 'loc.name2',
      }),
      clientPosX: 0,
      clientPosY: 0,
    }));
  });
});
