import { CHAT_MESSAGE } from '../../constants'

const chat = (member, room, message) =>
    ({
        type: CHAT_MESSAGE,
        member,
        room,
        message
    })

module.exports = chat