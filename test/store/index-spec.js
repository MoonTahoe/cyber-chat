import {
    SET_NAME,
    REQUEST_ROOM,
    JOIN_ROOM,
    CHAT_MESSAGE_SENT,
    CHAT_MESSAGE_RECEIVED,
    LEAVE_ROOM,
    EXIT_CHAT
}from'../../constants'
import rewire from 'rewire'
import { expect } from 'chai'
import { assert, spy } from 'sinon'

const storeFactory = rewire('../../store')

describe('Redux Stores', () => {

    let results,
        _console = {
            groupCollapsed: spy(),
            log: spy(),
            groupEnd: spy()
        }

    before(() => {
        storeFactory.__set__('console', _console)
    })

    afterEach(() => {
        _console.groupCollapsed.reset()
        _console.log.reset()
        _console.groupEnd.reset()
    })

    describe('client store', () => {

        describe('dispatching actions on client', () => {
            let testActions = [
                {
                    type: SET_NAME,
                    member: 'mark'
                },
                {
                    type: REQUEST_ROOM,
                    member: 'mark',
                    room: 'politics'
                },
                {
                    type: JOIN_ROOM,
                    room: 'politics',
                    members: ['dave', 'phil', 'mark'],
                    messages: [
                        'dave has entered the room',
                        'phil has entered the room',
                        'phil: hello???',
                        'dave: hey phil :)',
                        'mark has entered the room'
                    ]
                },
                {
                    type: CHAT_MESSAGE_SENT,
                    member: 'mark',
                    room: 'politics',
                    message: 'hey guys'
                },
                {
                    type: CHAT_MESSAGE_SENT,
                    member: 'mark',
                    room: 'politics',
                    message: 'any good ideas out there ??? lol'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'mark',
                    room: 'politics',
                    message: 'hey guys'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'mark',
                    room: 'politics',
                    message: 'any good ideas out there ??? lol'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'dave',
                    room: 'politics',
                    message: 'lemme see...'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'phil',
                    room: 'politics',
                    message: 'I gotta run'
                },
                {
                    type: LEAVE_ROOM,
                    member: 'phil',
                    room: 'politics'
                },
                {
                    type: CHAT_MESSAGE_SENT,
                    member: 'mark',
                    room: 'politics',
                    message: 'see ya phil'
                }
            ]

            before(() => {
                const store = storeFactory(false, false, {
                    'user': '',
                    'room': {
                        'name': '',
                        'requesting': false,
                        'members': [],
                        'messages': []
                    }
                })
                testActions.forEach(action => store.dispatch(action))
                results = store.getState()

            })

            it('correct client state', () => expect(results).to.deep.equal({
                'user': 'mark',
                'room': {
                    'name': 'politics',
                    'requesting': false,
                    'members': ['dave', 'mark'],
                    'messages': [
                        'dave has entered the room',
                        'phil has entered the room',
                        'phil: hello???',
                        'dave: hey phil :)',
                        'mark has entered the room',
                        'mark: hey guys',
                        'mark: any good ideas out there ??? lol',
                        'dave: lemme see...',
                        'phil: I gotta run',
                        'phil has left the room',
                        ['mark: see ya phil', 'sending', 'mark']
                    ]
                }
            }))
        })

        describe('logging on the client', () => {

            let action = {
                type: REQUEST_ROOM,
                member: 'mark',
                room: 'politics'
            }

            it('invokes 4 collapsed groups', () => {
                const store = storeFactory(true)
                store.dispatch(action)
                results = store.getState()
                assert.calledWith(_console.groupCollapsed, 'dispatching', 'REQUEST_ROOM')
            })

            it('does not log', () => {
                const store = storeFactory()
                store.dispatch(action)
                results = store.getState()
                assert.callCount(_console.groupCollapsed, 0)
            })

        })

    })

    describe('server store', () => {

        describe('dispatching actions on the server', () => {
            let testActions = [
                {
                    type: SET_NAME,
                    member: 'mark'
                },
                {
                    type: SET_NAME,
                    member: 'dave'
                },
                {
                    type: SET_NAME,
                    member: 'phil'
                },
                {
                    type: JOIN_ROOM,
                    member: 'mark',
                    room: 'politics'
                },
                {
                    type: JOIN_ROOM,
                    member: 'dave',
                    room: 'politics'
                },
                {
                    type: JOIN_ROOM,
                    member: 'phil',
                    room: 'sports'
                },
                {
                    type: SET_NAME,
                    member: 'cheryl'
                },
                {
                    type: SET_NAME,
                    member: 'mike'
                },
                {
                    type: JOIN_ROOM,
                    member: 'cheryl',
                    room: 'sports'
                },
                {
                    type: JOIN_ROOM,
                    member: 'mike',
                    room: 'entertainment'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'mark',
                    room: 'politics',
                    message: 'hey guys'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'dave',
                    room: 'politics',
                    message: 'what is up mark?'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'cheryl',
                    room: 'sports',
                    message: 'hello sports fans'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'mark',
                    room: 'politics',
                    message: 'what do you think of this election?'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'mike',
                    room: 'entertainment',
                    message: 'hello?'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'phil',
                    room: 'sports',
                    message: 'here lol'
                },
                {
                    type: CHAT_MESSAGE_RECEIVED,
                    member: 'phil',
                    room: 'sports',
                    message: 'brb'
                },
                {
                    type: LEAVE_ROOM,
                    member: 'phil',
                    room: 'sports'
                },
                {
                    type: LEAVE_ROOM,
                    member: 'mike',
                    room: 'entertainment'
                },
                {
                    type: EXIT_CHAT,
                    member: 'mike'
                }

            ]

            before(() => {
                const store = storeFactory(false, true, {
                    'users': [],
                    'rooms': [
                        {
                            'name': 'politics',
                            'members': [],
                            'messages': []
                        },
                        {
                            'name': 'sports',
                            'members': [],
                            'messages': []
                        },
                        {
                            'name': 'entertainment',
                            'members': [],
                            'messages': []
                        },
                        {
                            'name': 'science',
                            'members': [],
                            'messages': []
                        }
                    ]
                })
                testActions.forEach(action => store.dispatch(action))
                results = store.getState()

            })

            it('correct server state', () => expect(results).to.deep.equal({
                'users': ['mark', 'dave', 'phil', 'cheryl'],
                'rooms': [
                    {
                        'name': 'politics',
                        'members': ['mark', 'dave'],
                        'messages': [
                            'mark has entered the room',
                            'dave has entered the room',
                            'mark: hey guys',
                            'dave: what is up mark?',
                            'mark: what do you think of this election?'
                        ]
                    },
                    {
                        'name': 'sports',
                        'members': ['cheryl'],
                        'messages': [
                            'phil has entered the room',
                            'cheryl has entered the room',
                            'cheryl: hello sports fans',
                            'phil: here lol',
                            'phil: brb',
                            'phil has left the room'
                        ]
                    },
                    {
                        'name': 'entertainment',
                        'members': [],
                        'messages': [
                            'mike has entered the room',
                            'mike: hello?',
                            'mike has left the room'
                        ]
                    },
                    {
                        'name': 'science',
                        'members': [],
                        'messages': []
                    }
                ]
            }))
        })

        describe('logging on the server', () => {

            let action = {
                type: REQUEST_ROOM,
                member: 'mark',
                room: 'politics'
            }

            it('invokes 4 collapsed groups', () => {
                const store = storeFactory(true, true)
                store.dispatch(action)
                results = store.getState()
                assert.calledWith(_console.log, 'dispatching', 'REQUEST_ROOM')
            })

            it('does not log', () => {
                const store = storeFactory(false, true)
                store.dispatch(action)
                results = store.getState()
                assert.callCount(_console.log, 0)
            })

        })

    })

})
