import { JOIN_ROOM, LEAVE_ROOM } from '../../constants'

const members = (state=[], action={type:null}) => {
    switch(action.type) {
        case JOIN_ROOM :
            return [
                ...state,
                action.member
            ]
        case LEAVE_ROOM :
            return state.filter(member => member !== action.member)
        default:
            return state
    }
}

module.exports = members