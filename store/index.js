import { createStore, combineReducers, applyMiddleware } from 'redux'
import { user, rooms } from './reducers'

const logger = store => next => action => {
    let result
    console.groupCollapsed('dispatching', action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

module.exports = (logging = false, initialState={}) => {
    if (logging) {
        return applyMiddleware(logger)(createStore)(
            combineReducers({user, rooms}),
            initialState
        )
    } else {
        return createStore(
            combineReducers({user, rooms}),
            initialState
        )
    }
}