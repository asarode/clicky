import React, { PureComponent, PropTypes as P } from 'react'

export default class ClickPiece extends PureComponent {
  static propTypes = {
    onClick: P.func.isRequired
  }
  render () {
    return <div onClick={this.props.onClick}>
      Click me!
    </div>
  }
}