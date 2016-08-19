import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { ClickPiece } from '.'

describe('ClickPiece Component', () => {
  it('handles click events', () => {
    const clickSpy = sinon.spy()
    const wrapper = shallow(<ClickPiece onClick={clickSpy} />)
    wrapper.simulate('click')
    const actualClickCount = clickSpy.callCount
    const expectedClickCount = 1

    expect(actualClickCount).to.equal(expectedClickCount)
  })
})
