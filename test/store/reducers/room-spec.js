import {
    REQUEST_ROOM,
    JOIN_ROOM,
    LEAVE_ROOM,
    CHAT_MESSAGE_SENT,
    CHAT_MESSAGE_RECEIVED
} from '../../../constants'
import { room } from '../../../store/reducers'
import deepFreeze from 'deep-freeze'
import { expect } from 'chai'

describe('room Reducer', () => {

    it('REQUEST_ROOM success', () => {
        const state = {
            'name': '',
            'requesting': false,
            'members': [],
            'messages': []
        }
        const action = {
            type: REQUEST_ROOM,
            member: 'mark',
            room: 'politics'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(room(state, action)).to.deep.equal({
            'name': 'politics',
            'requesting': true,
            'members': [],
            'messages': []
        })
    })

    it('JOIN_ROOM success', () => {
        const state = {
            'name': 'politics',
            'requesting': true,
            'members': [],
            'messages': []
        }
        const action = {
            type: JOIN_ROOM,
            room: 'politics',
            members: ['phil', 'mark'],
            messages: [
                'phil has entered the room',
                'phil: hello???',
                'mark has entered the room'
            ]
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(room(state, action)).to.deep.equal({
            'name': 'politics',
            'requesting': false,
            'members': ['phil', 'mark'],
            'messages': [
                'phil has entered the room',
                'phil: hello???',
                'mark has entered the room'
            ]
        })
    })

    it('LEAVE_ROOM success', () => {
        const state = {
            'name': 'politics',
            'requesting': false,
            'members': ['phil', 'mark'],
            'messages': [
                'phil has entered the room',
                'phil: hello???',
                'mark has entered the room'
            ]
        }
        const action = {
            type: LEAVE_ROOM,
            room: 'politics',
            member: 'mark'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(room(state, action)).to.deep.equal({
            'name': '',
            'requesting': false,
            'members': [],
            'messages': []
        })
    })

    it('CHAT_MESSAGE_SENT success', () => {
        const state = {
            'name': 'politics',
            'requesting': false,
            'members': ['phil', 'mark'],
            'messages': [
                'phil has entered the room',
                'phil: hello???',
                'mark has entered the room'
            ]
        }
        const action = {
            type: CHAT_MESSAGE_SENT,
            room: 'politics',
            member: 'mark',
            message: 'hello guys, how is it going?'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(room(state, action)).to.deep.equal({
            'name': 'politics',
            'requesting': false,
            'members': ['phil', 'mark'],
            'messages': [
                'phil has entered the room',
                'phil: hello???',
                'mark has entered the room',
                ['mark: hello guys, how is it going?', 'sending', 'mark']
            ]
        })
    })

    it('CHAT_MESSAGE_RECEIVED success', () => {
        const state = {
            'name': 'politics',
            'requesting': false,
            'members': ['phil', 'mark'],
            'messages': [
                'phil has entered the room',
                'phil: hello???',
                'mark has entered the room',
                ['mark: hello guys, how is it going?', 'sending', 'mark']
            ]
        }
        const action = {
            type: CHAT_MESSAGE_RECEIVED,
            room: 'politics',
            member: 'mark',
            message: 'hello guys, how is it going?'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(room(state, action)).to.deep.equal({
            'name': 'politics',
            'requesting': false,
            'members': ['phil', 'mark'],
            'messages': [
                'phil has entered the room',
                'phil: hello???',
                'mark has entered the room',
                'mark: hello guys, how is it going?'
            ]
        })
    })

    it('Defaults for incorrect action', () => expect((room())).to.deep.equal({}))

})