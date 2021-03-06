import { SET_NAME, EXIT_CHAT } from '../../../constants'
import { user } from '../../../store/reducers'
import deepFreeze from 'deep-freeze'
import { expect } from 'chai'

describe('user Reducer', () => {

    it('SET_NAME success', () => {
        const state = ''
        const action = {
            type: SET_NAME,
            member: 'mark'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(user(state, action)).to.deep.equal('mark')
    })

    it('EXIT_CHAT success', () => {
        const state = 'mark'
        const action = {
            type: EXIT_CHAT,
            member: 'mark'
        }
        deepFreeze(state)
        deepFreeze(action)

        expect(user(state, action)).to.deep.equal('')
    })

    it('Defaults for incorrect action', () => expect((user())).to.deep.equal(''))

})