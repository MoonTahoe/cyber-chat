const sockets = (io, store) =>
    io.sockets.on('connection', function (socket) {
        console.log(`${socket.id} connected`)
        socket.once('disconnect',() => {
            console.log(`${socket.id} disconnected`)
            socket.disconnect()
        })
    })

module.exports = sockets