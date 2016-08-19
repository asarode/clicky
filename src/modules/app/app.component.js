import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ClickPiece } from 'modules/click-piece'

@connect((state) => ({
  score: state.score
}))
export default class App extends Component {
  render () {
    return <div>
      <ClickPiece />
    </div>
  }
}
