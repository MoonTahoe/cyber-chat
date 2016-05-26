import request from 'supertest'
import { expect } from 'chai'
import cheerio from 'cheerio'
import app from '../../server/app'

describe('Express Server', () => {

    let $

    describe('Home Page "/"', () => {

        before(done => {
            request(app).get('/').expect(200).end((error, res) => {
                if (error) {
                    throw error
                }
                $ = cheerio.load(res.text)
                done()
            })
        })

        it('Page title should read "Cyber Chat"', () =>
            expect($('title').text()).to.equal('Cyber Chat')
        )

        it('Should render header on server', () =>
            expect($('h1').text()).to.equal('Cyber Chat')
        )

    })

})