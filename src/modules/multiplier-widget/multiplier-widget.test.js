import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { MultiplierWidget } from '.'

describe('MultiplierWidget Component', () => {
  it('calls activate when clicked and inactive', () => {
    const activateSpy = sinon.spy()
    const wrapper = shallow(
      <MultiplierWidget
        isActive={false}
        activateAction={activateSpy}
        hideAction={() => {}} />
    )
    wrapper.simulate('click')

    expect(activateSpy.callCount).to.equal(1)
  })

  it('does not call activate when clicked and active', () => {
    const activateSpy = sinon.spy()
    const wrapper = shallow(
      <MultiplierWidget
        isActive={true}
        activateAction={activateSpy}
        hideAction={() => {}} />
    )
    wrapper.simulate('click')

    expect(activateSpy.callCount).to.equal(0)
  })
})
