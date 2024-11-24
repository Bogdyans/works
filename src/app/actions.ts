'use server'

import { Server as NetServer } from 'http'
import { NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'

export type NextApiResponseServerIO = NextApiResponse & {
    socket: {
        server: NetServer & {
            io: ServerIO
        }
    }
}

export async function initializeSocket(res: NextApiResponseServerIO) {
    if (res && res.socket.server.io) {
        console.log('Socket is already running')
        return res.socket.server.io
    }

    console.log('Socket is initializing')
    const io = new ServerIO(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
        socket.on('send-message', msg => {
            io.emit('receive-message', msg)
        })
    })

    return io
}