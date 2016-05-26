import React from 'react'
import http from 'http'
import app from './app'
import socketIO from 'socket.io'
import sockets from './sockets'

const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = require('socket.io').listen(server)

global.React = React
app.set('port', port)
server.listen(port)
sockets(io)

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
    console.log(`chat socket server started on ${port}`)
})