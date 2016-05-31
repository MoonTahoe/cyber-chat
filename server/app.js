import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import initialState from '../data/server'
import storeFactory from '../store'
import { errorResponse, notFoundError } from './errors'

const serverStore = storeFactory(true, true, initialState)

module.exports = express()
    .set('store', serverStore)
    .use(favicon(path.join(__dirname, '../dist/favicon.ico')))
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(cors())
    .use(express.static(path.join(__dirname, '../dist')))
    .use((req, res, next) => {
        req.store = serverStore
        next()
    })
    .use('/', routes)
    .use(notFoundError)
    .use(errorResponse)