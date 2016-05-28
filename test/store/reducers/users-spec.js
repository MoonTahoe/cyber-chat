import { SET_NAME, EXIT_CHAT } from '../../../constants'
import { users } from '../../../store/reducers'
import deepFreeze from 'deep-freeze'
import { expect } from 'chai'

describe('users Reducer', () => {

    it('SET_NAME success', () => {
        const state = ['tom']
        const action = {
            type: SET_NAME,
            member: 'mark'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(users(state, action)).to.deep.equal(['tom','mark'])
    })

    it('EXIT_CHAT success', () => {
        const state = ['tom', 'mark']
        const action = {
            type: EXIT_CHAT,
            member: 'mark'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(users(state, action)).to.deep.equal(['tom'])
    })

    it('Defaults for incorrect action', () => expect((users())).to.deep.equal([]))

})