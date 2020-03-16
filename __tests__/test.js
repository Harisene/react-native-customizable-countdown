/**
 * @format
 */

//import 'react-native';
//import React from 'react';
import {CountDown} from '../index';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<CountDown />).toJSON();
  expect(tree).toMatchSnapshot();
});
