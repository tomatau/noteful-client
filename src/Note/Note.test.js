import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Note from './Note'

describe(`Note component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: 'u2018-04-26T23:00:00.000Z',
  }

  it('renders a .Note by default', () => {
    const wrapper = shallow(<Note />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Note given props', () => {
    const wrapper = shallow(<Note {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
