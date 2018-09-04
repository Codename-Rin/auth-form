import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './Form';
import Input from './Input/Input';

configure({adapter: new Adapter()});

describe('<Form />', () => {
    it('should render three <Input /> items', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper.find(Input)).toHaveLength(3);
    })
});