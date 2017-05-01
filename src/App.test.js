import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders a list of todo items', () => {
  const wrapper = mount(<App />)

  expect(wrapper.find('li')).toHaveLength(7)
  expect(wrapper.find('li').at(0).text()).toEqual('Get Groceries')
  expect(wrapper.find('li').at(1).text()).toEqual('Pick up living room')
  expect(wrapper.find('li').at(2).text()).toEqual('Watch New episode of Game of Thrones')
})

it('adds a new todo item to the list', () => {
  const wrapper = mount(<App />)
  wrapper.find('.plus-sign').simulate('click')
  wrapper.find('input .new-task-input').simulate('focus')
  wrapper.find('input .new-task-input').simulate('change', { target: { value: 'Changed' } })
  expect(wrapper.find('li')).toHaveLength(7)

  wrapper.find('.addButton').simulate('click')
  expect(wrapper.find('li')).toHaveLength(8)
  expect(wrapper.find('li').at(7).text()).toEqual('Changed')
})

it('filters todo items by date', () => {
  const wrapper = mount(<App />)

  expect(wrapper.find('li')).toHaveLength(7)

  wrapper.find('.next a').simulate('click')
  expect(wrapper.find('li')).toHaveLength(1)

  wrapper.find('.previous a').simulate('click')
  wrapper.find('.previous a').simulate('click')
  expect(wrapper.find('li')).toHaveLength(0)
})

it('displays summary statement', () => {
  const wrapper = mount(<App />)

  expect(wrapper.find('.Summary p').text()).toEqual('Only 7 Tasks Left Today! Awesome!')

  wrapper.find('.previous a').simulate('click')
  expect(wrapper.find('.Summary p').text()).toEqual('Only 0 Tasks. Relax or add one below.')

  wrapper.find('.next a').simulate('click')
  wrapper.find('.next a').simulate('click')
  expect(wrapper.find('.Summary p').text()).toEqual('Only 1 Task Left Today! Awesome!')
})
