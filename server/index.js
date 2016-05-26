import React from 'react'
import http from 'http'
import app from './app'

global.React = React

const port = process.env.PORT || 3000

app.set('port', port)

const server = http.createServer(app)

server.listen(port)

server.on('error', (error) => {

    switch (error.code) {

        case 'EACCES':
            console.error('access denied')
            process.exit(1)
            break

        case 'EADDRINUSE':
            console.error(`port ${port} is already in use`)
            process.exit(1)
            break

        default:
            throw error
    }

})

server.on('listening', () => {
    console.log(`server started on ${port}`)
})