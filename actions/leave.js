import { LEAVE_ROOM } from '../../constants'

const leave = (member, room) =>
    ({
        type: LEAVE_ROOM,
        member,
        room
    })

module.exports = leave