import { SET_NAME } from '../../../constants'
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

    it('Defaults for incorrect action', () => expect((user())).to.deep.equal(''))

})