import {
    REQUEST_ROOM,
    JOIN_ROOM,
    LEAVE_ROOM,
    CHAT_MESSAGE_SENT,
    CHAT_MESSAGE_RECEIVED
} from '../../constants'
import members from './members'
import messages from './messages'

const room = (state = {}, action = {type: null}) => {
    switch (action.type) {
        case REQUEST_ROOM :
            return {
                ...state,
                name: action.room,
                requesting: true
            }
        case JOIN_ROOM :
            return {
                name: action.room,
                requesting: false,
                members: action.members,
                messages: action.messages
            }
        case LEAVE_ROOM :
            return {
                'name': '',
                'requesting': false,
                'members': [],
                'messages': []
            }
        case CHAT_MESSAGE_SENT :
        case CHAT_MESSAGE_RECEIVED :
            return {
                ...state,
                messages: messages(state.messages, action)
            }
        default:
            return state
    }
}

module.exports = room