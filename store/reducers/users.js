import { SET_NAME, EXIT_CHAT } from '../../constants'
import members from './members'
import messages from './messages'

const users = (state=[], action={type:null}) => {
    switch(action.type) {
        case SET_NAME :
            return [...state, action.member]
        case EXIT_CHAT :
            return state.filter(name => name !== action.member)
        default:
            return state
    }
}

module.exports = users