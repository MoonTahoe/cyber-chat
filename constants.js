import readOnly from 'deep-freeze'

const constants = {
    SET_NAME: 'SET_NAME',
    JOIN_ROOM: 'JOIN_ROOM',
    CHAT_MESSAGE: 'CHAT_MESSAGE',
    LEAVE_ROOM: 'LEAVE_ROOM',
    CHANGE_NAME: 'CHANGE_NAME'
}

module.exports = readOnly(constants)