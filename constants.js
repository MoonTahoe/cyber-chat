import readOnly from 'deep-freeze'

const constants = {
    SET_NAME: 'SET_NAME',
    JOIN_ROOM: 'JOIN_ROOM',
    CHAT_MESSAGE: 'CHAT_MESSAGE',
    LEAVE_ROOM: 'LEAVE_ROOM'
}

module.exports = readOnly(constants)