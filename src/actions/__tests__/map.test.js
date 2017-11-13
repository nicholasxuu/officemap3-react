import * as actions from '../map';
import * as types from '../../constants/ActionTypes';

describe('test setViewportMatrix', () => {
  it('should create an action to set viewport matrix', () => {
    const viewportMatrix = [1, 0, 0, 1, 0, 0];
    const expectedAction = {
      type: types.SET_VIEWPORT_MATRIX,
      viewportMatrix,
    };
    expect(actions.setViewportMatrix(viewportMatrix))
      .toEqual(expectedAction);
  });
});

