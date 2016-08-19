import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ScoreDisplay } from '.'

describe('ScoreDisplay Component', () => {
  it('shows level', () => {
    const wrapper = shallow(<ScoreDisplay score={100} />)
    expect(wrapper.text()).to.equal('100')
  })
})
