import { SET_NAME } from '../../constants'

const setName = (name) =>
    ({
        type: SET_NAME,
        name
    })

module.exports = setName