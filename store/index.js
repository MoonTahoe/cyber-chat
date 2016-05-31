import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { users, user, room, rooms } from './reducers'

const clientLogger = store => next => action => {
    let result
    console.groupCollapsed('dispatching', action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const serverLogger = store => next => action => {
    let result
    console.log('dispatching', action.type)
    result = next(action)
    return result
}

module.exports = (logging = false, serverStore = false, initialState = {}) => {

    const reducers = combineReducers(
        (serverStore) ?
        {users, rooms} :
        {user, room}
    )

    const logger = (serverStore) ? serverLogger : clientLogger

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