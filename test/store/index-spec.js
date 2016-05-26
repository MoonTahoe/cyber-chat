import { SET_NAME, JOIN_ROOM, CHAT_MESSAGE, LEAVE_ROOM } from '../../constants'
import rewire from 'rewire'
import { expect } from 'chai'
import { assert, spy } from 'sinon'

const storeFactory = rewire('../../store')

describe('Redux Store', () => {

    let results,
        _console = {
            groupCollapsed: spy(),
            log: spy(),
            groupEnd: spy()
        }

    afterEach(() => {
        _console.groupCollapsed.reset()
        _console.log.reset()
        _console.groupEnd.reset()
    })

    describe('dispatching actions', () => {
        let testActions = [
            {
                type: SET_NAME,
                member: 'mark'
            },
            {
                type: JOIN_ROOM,
                member: 'mark',
                room: 'politics'
            },
            {
                type: CHAT_MESSAGE,
                member: 'mark',
                room: 'politics',
                message: 'hey guys'
            },
            {
                type: JOIN_ROOM,
                member: 'phil',
                room: 'politics'
            },
            {
                type: CHAT_MESSAGE,
                member: 'phil',
                room: 'politics',
                message: 'hello'
            },
            {
                type: LEAVE_ROOM,
                member: 'mark',
                room: 'politics'
            }
        ]

        before(() => {
            storeFactory.__set__('console', _console)
            const store = storeFactory(false, {
                user: '',
                rooms: [
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
            })
            testActions.forEach(action => store.dispatch(action))
            results = store.getState()

        })

        it('correctly dispatches actions', () => expect(results).to.deep.equal({
            user: 'mark',
            rooms: [
                {
                    'name': 'politics',
                    'members': ['phil'],
                    'messages': [
                        'mark has entered the room',
                        'mark: hey guys',
                        'phil has entered the room',
                        'phil: hello',
                        'mark has left the room'
                    ]
                },
                {
                    'name': 'sports',
                    'members': [],
                    'messages': []
                }
            ]
        }))
    })

    describe('logging', () => {

        before(() => {
            storeFactory.__set__('console', _console)
            const store = storeFactory(true)
            store.dispatch({
                type: JOIN_ROOM,
                member: 'mark',
                room: 'politics'
            })
            results = store.getState()
        })

        it('invokes 4 collapsed groups', () => assert.calledWith(_console.groupCollapsed, 'dispatching', JOIN_ROOM))

        it('does not log', () => {
            storeFactory.__set__('console', _console)
            const store = storeFactory()
            store.dispatch({
                type: JOIN_ROOM,
                member: 'mark',
                room: 'politics'
            })
            results = store.getState()
            assert.callCount(_console.groupCollapsed, 0)
        })

    })

})
