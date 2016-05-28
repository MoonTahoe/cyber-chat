import { JOIN_ROOM, LEAVE_ROOM, CHAT_MESSAGE_SENT, CHAT_MESSAGE_RECEIVED } from '../../../constants'
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

    it('CHAT_MESSAGE_SENT success', () => {
        const state = ['ted: hi']
        const action = {
            type: CHAT_MESSAGE_SENT,
            room: 'politics',
            member: 'mark',
            message: 'hello guys, how is it going?'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(messages(state, action)).to.deep.equal([
            'ted: hi',
            ['mark: hello guys, how is it going?', 'sending', 'mark']
        ])
    })

    it('CHAT_MESSAGE_RECEIVED success', () => {
        const state = ['ted: hi']
        const action = {
            type: CHAT_MESSAGE_RECEIVED,
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