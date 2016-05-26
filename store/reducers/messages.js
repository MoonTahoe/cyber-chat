import { JOIN_ROOM, LEAVE_ROOM, CHAT_MESSAGE } from '../../constants'

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
        case CHAT_MESSAGE :
            return [
                ...state,
                `${action.member}: ${action.message}`
            ]
        default:
            return state
    }
}

module.exports = messages