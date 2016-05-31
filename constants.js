import readOnly from 'deep-freeze'

const constants = {
    SET_NAME: 'SET_NAME',
    REQUEST_ROOM: 'REQUEST_ROOM',
    JOIN_ROOM: 'JOIN_ROOM',
    CHAT_MESSAGE_SENT: 'CHAT_MESSAGE_SENT',
    CHAT_MESSAGE_RECEIVED: 'CHAT_MESSAGE_RECEIVED',
    LEAVE_ROOM: 'LEAVE_ROOM',
    MEMBER_LEAVE_ROOM: 'MEMBER_LEAVE_ROOM',
    EXIT_CHAT: 'EXIT_CHAT'
}

module.exports = readOnly(constants)