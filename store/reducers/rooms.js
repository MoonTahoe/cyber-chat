import { JOIN_ROOM, LEAVE_ROOM, CHAT_MESSAGE } from '../../constants'
import members from './members'
import messages from './messages'

const rooms = (state=[], action={type:null}) => {
    switch(action.type) {
        case JOIN_ROOM :
        case LEAVE_ROOM :
            return state.map(room => (room.name !== action.room) ? room : {
                ...room,
                members: members(room.members, action),
                messages: messages(room.messages, action)
            })
        case CHAT_MESSAGE :
            return state.map(room => (room.name !== action.room) ? room : {
                ...room,
                messages: messages(room.messages, action)
            })
        default:
            return state
    }
}

module.exports = rooms