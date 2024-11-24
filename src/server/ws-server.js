import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message.toString());

        // Broadcast the message to all clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
                console.log(message.toString());
            }
        });
    });

    ws.send('Connected to the WebSocket server');
});

console.log('WebSocket server is running on ws://localhost:8080');