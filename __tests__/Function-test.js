import 'react-native';
import React from 'react';
import {CountDown} from '../modules/CountDown/index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const initialSeconds = 5683;

test('calcutateSeconds function works fine!', () => {
  let countDown = renderer
    .create(<CountDown onTimeOut={() => {}} />)
    .getInstance();

  expect(countDown.calculateSeconds(initialSeconds)).toEqual(43);
});

test('calcutateMinutes function works fine!', () => {
  let countDown = renderer
    .create(<CountDown onTimeOut={() => {}} />)
    .getInstance();

  expect(countDown.calculateMinutes(initialSeconds)).toEqual(35);
});

test('calcutateHours function works fine!', () => {
  let countDown = renderer
    .create(<CountDown onTimeOut={() => {}} />)
    .getInstance();

  expect(countDown.calculateHours(initialSeconds)).toEqual(2);
});

test('addSeconds function works fine!', () => {
  let countDown = renderer
    .create(<CountDown initialSeconds={120} onTimeOut={() => {}} />)
    .getInstance();

  countDown.addSeconds(30);

  expect(countDown.state.seconds).toEqual(30);
  expect(countDown.state.minutes).toEqual(3);
  expect(countDown.state.hours).toEqual(0);
});

test('deductSeconds function works fine!', () => {
  let countDown = renderer
    .create(<CountDown initialSeconds={60} onTimeOut={() => {}} />)
    .getInstance();

  countDown.deductSeconds(60);

  expect(countDown.state.seconds).toEqual(0);
  expect(countDown.state.minutes).toEqual(0);
  expect(countDown.state.hours).toEqual(0);
});

test('setTimer function works fine!', () => {
  let countDown = renderer
    .create(<CountDown initialSeconds={3} onTimeOut={() => {}} />)
    .getInstance();

  const timer = setTimeout(() => {
    expect(countDown.state.seconds).toBe(0);
    clearTimeout(timer);
  }, 4000);
});
