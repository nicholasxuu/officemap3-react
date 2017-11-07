/* eslint-disable function-paren-newline,prefer-const */
// Link.react-test.js
import React from 'react';
import Immutable from 'immutable';
import renderer from 'react-test-renderer';
import MapHoverTip from '../MapHoverTip';

test('HoverTip shown', () => {
  const component = renderer.create(
    <MapHoverTip
      show
      clientPosX={10}
      clientPosY={20}
      locationObj={Immutable.fromJS({
        id: 1,
        name: 'locationName',
      })}
    />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('HoverTip not shown', () => {
  const component = renderer.create(
    <MapHoverTip
      show={false}
      clientPosX={10}
      clientPosY={20}
      locationObj={Immutable.fromJS({
        id: 1,
        name: 'locationName',
      })}
    />,
  );

  let tree = component.toJSON();
  expect(tree).toBe(null);
});


test('Invalid HoverTip not shown', () => {
  const component = renderer.create(
    <MapHoverTip
      show
      clientPosX={10}
      clientPosY={20}
    />,
  );

  let tree = component.toJSON();
  expect(tree).toBe(null);
});
