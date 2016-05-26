import {notFoundError, errorResponse} from '../../server/errors'
import { spy } from 'sinon'
import { expect } from 'chai'

describe('server errors', () => {

    describe('notFoundError 404', () => {

        let result, _next = spy()

        before(() => {
            result = notFoundError({}, {}, _next)
        })

        it('pipes 404 error', () => expect(_next.args[0][0].status).to.equal(404))

    })

    describe('error 500', () => {

        let result,
            _res = {
                json: spy(),
                status: spy()
            }

        afterEach(() => {
            _res.json.reset()
            _res.status.reset()
        })

        it('responds with json error', () => {
            errorResponse({}, {}, _res)
            expect(_res.status.calledWith(500)).to.equal(true)
        })

        it('sets the response status', () => {
            errorResponse({ status: 404 }, {}, _res)
            expect(_res.json.calledOnce).to.equal(true)
        })

    })

})