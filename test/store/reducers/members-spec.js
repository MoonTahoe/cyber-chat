import { JOIN_ROOM, LEAVE_ROOM } from '../../../constants'
import { members } from '../../../store/reducers'
import deepFreeze from 'deep-freeze'
import { expect } from 'chai'

describe('members Reducer', () => {

    it('JOIN_ROOM success', () => {
        const state = ['ted', 'joe']
        const action = {
            type: JOIN_ROOM,
            member: 'mark',
            room: 'politics'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(members(state, action)).to.deep.equal(['ted','joe','mark'])
    })

    it('LEAVE_ROOM success', () => {
        const state = ['ted', 'joe']
        const action = {
            type: LEAVE_ROOM,
            member: 'joe',
            room: 'politics'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(members(state, action)).to.deep.equal(['ted'])
    })

    it('Defaults for incorrect action', () => expect((members())).to.deep.equal([]))

})