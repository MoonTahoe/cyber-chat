import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { App, Help, Error404, Room } from './components'

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/help" component={Help}/>
        <Route path="/room/:name" component={Room}/>
        <Route path="*" component={Error404}/>
    </Router>
)

module.exports = routes