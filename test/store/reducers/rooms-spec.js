import { JOIN_ROOM, LEAVE_ROOM, CHAT_MESSAGE_RECEIVED } from '../../../constants'
import { rooms } from '../../../store/reducers'
import deepFreeze from 'deep-freeze'
import { expect } from 'chai'

describe('rooms Reducer', () => {

    it('JOIN_ROOM success', () => {
        const state = [
            {
                'name': 'politics',
                'members': [],
                'messages': []
            },
            {
                'name': 'sports',
                'members': [],
                'messages': []
            }
        ]
        const action = {
            type: JOIN_ROOM,
            member: 'mark',
            room: 'politics'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(rooms(state, action)).to.deep.equal([
            {
                'name': 'politics',
                'members': ['mark'],
                'messages': ['mark has entered the room']
            },
            {
                'name': 'sports',
                'members': [],
                'messages': []
            }
        ])
    })

    it('LEAVE_ROOM success', () => {
        const state = [
            {
                'name': 'politics',
                'members': ['mark'],
                'messages': ['mark has entered the room']
            },
            {
                'name': 'sports',
                'members': [],
                'messages': []
            }
        ]
        const action = {
            type: LEAVE_ROOM,
            member: 'mark',
            room: 'politics'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(rooms(state, action)).to.deep.equal([
            {
                'name': 'politics',
                'members': [],
                'messages': ['mark has entered the room', 'mark has left the room']
            },
            {
                'name': 'sports',
                'members': [],
                'messages': []
            }
        ])
    })

    it('CHAT_MESSAGE_RECEIVED success', () => {
        const state = [
            {
                'name': 'politics',
                'members': ['mark'],
                'messages': ['mark has entered the room']
            },
            {
                'name': 'sports',
                'members': [],
                'messages': []
            }
        ]
        const action = {
            type: CHAT_MESSAGE_RECEIVED,
            member: 'mark',
            room: 'politics',
            message: 'hey guys'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(rooms(state, action)).to.deep.equal([
            {
                'name': 'politics',
                'members': ['mark'],
                'messages': ['mark has entered the room', 'mark: hey guys']
            },
            {
                'name': 'sports',
                'members': [],
                'messages': []
            }
        ])
    })

    it('Defaults for incorrect action', () => expect((rooms())).to.deep.equal([]))

})