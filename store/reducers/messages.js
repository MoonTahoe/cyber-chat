import { JOIN_ROOM, LEAVE_ROOM, CHAT_MESSAGE_SENT, CHAT_MESSAGE_RECEIVED } from '../../constants'

const messages = (state=[], action={type:null}) => {
    switch(action.type) {
        case JOIN_ROOM :
            return [
                ...state,
                `${action.member} has entered the room`
            ]
        case LEAVE_ROOM :
            return [
                ...state,
                `${action.member} has left the room`
            ]
        case CHAT_MESSAGE_SENT :
            return [
                ...state,
                [`${action.member}: ${action.message}`, 'sending', action.member]
            ]
        case CHAT_MESSAGE_RECEIVED :
            return [
                ...state.filter(message => typeof message === 'string'),
                `${action.member}: ${action.message}`
            ]
        default:
            return state
    }
}

module.exports = messages