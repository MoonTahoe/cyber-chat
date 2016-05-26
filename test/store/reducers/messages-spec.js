import { JOIN_ROOM, LEAVE_ROOM, CHAT_MESSAGE } from '../../../constants'
import { messages } from '../../../store/reducers'
import deepFreeze from 'deep-freeze'
import { expect } from 'chai'

describe('messages Reducer', () => {

    it('JOIN_ROOM success', () => {
        const state = []
        const action = {
            type: JOIN_ROOM,
            member: 'mark',
            room: 'politics'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(messages(state, action)).to.deep.equal(['mark has entered the room'])
    })

    it('LEAVE_ROOM success', () => {
        const state = []
        const action = {
            type: LEAVE_ROOM,
            member: 'joe',
            room: 'politics'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(messages(state, action)).to.deep.equal(['joe has left the room'])
    })

    it('CHAT_MESSAGE success', () => {
        const state = ['ted: hi']
        const action = {
            type: CHAT_MESSAGE,
            member: 'joe',
            room: 'sports',
            message: 'hello world'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(messages(state, action)).to.deep.equal(['ted: hi', 'joe: hello world'])
    })

    it('Defaults for incorrect action', () => expect((messages())).to.deep.equal([]))

})