import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './Form';
import Input from './Input/Input';
import css from './Form.css';

configure({adapter: new Adapter()});

describe('<Form />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Form />);
    });

    it('should render three <Input /> items', () => {
        expect(wrapper.find(Input)).toHaveLength(3);
    })
});