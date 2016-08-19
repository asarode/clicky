import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { LevelBadge } from '.'

describe('LevelBadge Component', () => {
  it('shows level', () => {
    const wrapper = shallow(<LevelBadge currentLevel={7} />)
    expect(wrapper.text()).to.equal('Lvl 7')
  })
})
