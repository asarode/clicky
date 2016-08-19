import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { NextLevelIndicator } from '.'

describe('NextLevelIndicator Component', () => {
  it('shows points until next level', () => {
    const wrapper = shallow(<NextLevelIndicator score={1} scoreForNextLevel={5} />)
    expect(wrapper.text()).to.equal('4')
  })
})
