import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Header from './components/Header/Header';
import Form from './components/Form/Form';

configure({adapter: new Adapter()});

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render one <Header /> item', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should render one <Form /> item', () => {
    expect(wrapper.find(Form)).toHaveLength(1);
  })
});