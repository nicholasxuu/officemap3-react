/* eslint-disable function-paren-newline */
import Immutable from 'immutable';
import React from 'react';
import { shallow, mount } from 'enzyme';
import DOMUtils from '../DOMUtils';

test('setAttributes with undefined', () => {
  const inputTarget = 'a';
  const expectedTarget = inputTarget;

  DOMUtils.setAttributes(inputTarget);

  expect(inputTarget).toEqual(expectedTarget);
});

test('setAttributes with Object', () => {
  const inputTarget = mount(
    <div data-a="b" />,
  ).getDOMNode();

  const inputAttributes = { 'data-b': 'c', 'data-c': 'd' };

  const expectedTarget = mount(
    <div data-a="b" data-b="c" data-c="d" />,
  ).getDOMNode();

  DOMUtils.setAttributes(inputTarget, inputAttributes);

  expect(inputTarget).toEqual(expectedTarget);
});

test('setAttributes with Immutable', () => {
  const inputTarget = mount(
    <div data-a="b" />,
  ).getDOMNode();

  const inputAttributes = Immutable.fromJS({ 'data-b': 'c', 'data-c': 'd' });

  const expectedTarget = mount(
    <div data-a="b" data-b="c" data-c="d" />,
  ).getDOMNode();

  DOMUtils.setAttributes(inputTarget, inputAttributes);

  expect(inputTarget).toEqual(expectedTarget);
});
