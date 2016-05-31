import React from 'react'
import { Provider } from 'react-redux'
import storeFactory from './store'
import { render } from 'react-dom'
import { App } from './components'

const clientStore = storeFactory(true, false, window.__INITIAL_STATE__)

window.React = React
window.store = clientStore

render(
    <Provider store={clientStore}>
        <App />
    </Provider>,
    document.getElementById('react-container')
)