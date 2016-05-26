import { SET_NAME } from '../../constants'

const user = (state='', action={type:null}) => {
    switch(action.type) {
        case SET_NAME :
            return action.member
        default:
            return state
    }
}

module.exports = user