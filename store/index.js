import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { users, user, room, rooms } from './reducers'

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


module.exports = (serverStore=false, logging = false, initialState={}) => {

    const reducers = combineReducers(
        (serverStore) ?
            {users, rooms} :
            {user, room}
    )

    if (logging) {
        return applyMiddleware(logger)(createStore)(
            reducers,
            initialState
        )
    } else {
        return createStore(
            reducers,
            initialState
        )
    }
}