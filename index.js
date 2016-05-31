import React from 'react'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import routes from './routes'

const clientStore = storeFactory(true, false, window.__INITIAL_STATE__)

window.React = React
window.store = clientStore

render(
    <Provider store={clientStore}>
        {routes}
    </Provider>,
    document.getElementById('react-container'))