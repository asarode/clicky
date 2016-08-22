import React, { Component, PropTypes as P } from 'react'
import cx from 'classnames'
import { clearStorage } from 'modules/storage'
import { style } from '.'

export default class ClearStorageButton extends Component {
  state = {
    showClearStorageMessage: false,
    clearStorageError: null
  }

  render () {
    let clearStorageMessage = 'clear storage'
    if (this.state.showClearStorageMessage) {
      clearStorageMessage = this.state.clearStorageError
        ? 'error clearing storage'
        : "aaaand, it's cleared!"
    }
    return <button
      className={style.clearButton}
      onClick={() => this.onClearStorage()}>
      { clearStorageMessage }
    </button>
  }

  onClearStorage = () => {
    const err = clearStorage()
    if (err) {
      this.setState({
        clearStorageError: err,
        showClearStorageMessage: true
      })
    } else {
      this.setState({
        clearStorageError: null,
        showClearStorageMessage: true
      })
    }

    if (this.clearStorageTimeout) {
      clearTimeout(this.clearStorageTimeout)
    }

    this.clearStorageTimeout = setTimeout(() => {
      this.setState({
        clearStorageError: null,
        showClearStorageMessage: false
      })
    }, 1000)
  }
}
