import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
    if (res.socket.server.io){
        console.log('socket running already');
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('send-message', msg => {
                io.emit('receive-message', msg)
            })
        })
    }
    res.end()
}

export default SocketHandler;