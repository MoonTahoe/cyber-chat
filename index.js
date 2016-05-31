import React from 'react'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { App, Help, Error404, Room } from './components'

const clientStore = storeFactory(true, false, window.__INITIAL_STATE__)

window.React = React
window.store = clientStore

const routes = (
    <Provider store={clientStore}>
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/help" component={Help}/>
            <Route path="/room/:name" component={Room}/>
            <Route path="*" component={Error404}/>
        </Router>
    </Provider>
)

render(routes, document.getElementById('react-container'))