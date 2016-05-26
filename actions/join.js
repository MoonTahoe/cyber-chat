import { JOIN_ROOM } from '../../constants'

const join = (member, room) =>
    ({
        type: JOIN_ROOM,
        member,
        room
    })

module.exports = join