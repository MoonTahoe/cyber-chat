import { SET_NAME, LEAVE_ROOM, EXIT_CHAT } from '../../constants'

const user = (state='', action={type:null}) => {
    switch(action.type) {
        case SET_NAME :
            return action.member
        case EXIT_CHAT :
            return ''
        default:
            return state
    }
}

module.exports = user