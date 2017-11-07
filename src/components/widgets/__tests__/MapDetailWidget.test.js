/* eslint-disable function-paren-newline,prefer-const */
// Link.react-test.js
import React from 'react';
import Immutable from 'immutable';
import renderer from 'react-test-renderer';
import MapDetailWidget from '../MapDetailWidget';

test('DetailWidget shown', () => {
  const component = renderer.create(
    <MapDetailWidget
      show
      pagePosX={10}
      pagePosY={20}
      locationObj={Immutable.fromJS({
        id: 1,
        name: 'locationName',
        image: 'image/location/sfas.jpg',
        description: '<div>I <b>am</b> HTML</div>',
      })}
    />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DetailWidget not shown', () => {
  const component = renderer.create(
    <MapDetailWidget
      show={false}
      pagePosX={10}
      pagePosY={20}
      locationObj={Immutable.fromJS({
        id: 1,
        name: 'locationName',
        image: 'image/location/sfas.jpg',
        description: '<div>I <b>am</b> HTML</div>',
      })}
    />,
  );

  let tree = component.toJSON();
  expect(tree).toBe(null);
});

test('Invalid DetailWidget not shown', () => {
  const component = renderer.create(
    <MapDetailWidget
      show
      pagePosX={10}
      pagePosY={20}
    />,
  );

  let tree = component.toJSON();
  expect(tree).toBe(null);
});
