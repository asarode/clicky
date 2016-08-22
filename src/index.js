import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from 'modules/state/store'
import { App } from 'modules/app'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
