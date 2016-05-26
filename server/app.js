import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import { errorResponse, notFoundError } from './errors'

module.exports = express()
    .use(favicon(path.join(__dirname, '../dist/favicon.ico')))
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(cors())
    .use('/', routes)
    .use(express.static(path.join(__dirname, '../dist')))
    .use(notFoundError)
    .use(errorResponse)