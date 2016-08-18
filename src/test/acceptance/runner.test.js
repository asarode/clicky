import Nightmare from 'nightmare'
import { expect } from 'chai'
require('mocha-generators').install()

describe('Start page', function () {
  this.timeout(5000) // Set timeout to 15 seconds, instead of the original 2 seconds
  var url = 'http://127.0.0.1:5050'

  it('should show the app element', function * () {
    const appLength = yield Nightmare()
      .goto(url)
      .evaluate(() => {
        return document.querySelectorAll('#app').length
      })

    expect(appLength).to.equal(1)
  })
})
