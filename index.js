import React from 'react'
import { Provider } from 'react-redux'
import storeFactory from './store'
import { render } from 'react-dom'
import { App } from './components'

window.React = React

render(
    <Provider store={storeFactory(true, window.__INITIAL_STATE__)}>
        <App />
    </Provider>,
    document.getElementById('react-container')
)