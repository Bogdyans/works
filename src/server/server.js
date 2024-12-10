import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const createPawn = (color) => ({ type: 'pawn', color });
const createRook = (color) => ({ type: 'rook', color });
const createKnight = (color) => ({ type: 'knight', color });
const createBishop = (color) => ({ type: 'bishop', color });
const createQueen = (color) => ({ type: 'queen', color });
const createKing = (color) => ({ type: 'king', color });


const initialBoard = [
    [createRook('black'), createKnight('black'), createBishop('black'), createQueen('black'), createKing('black'), createBishop('black'), createKnight('black'), createRook('black')],
    [createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black')],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white')],
    [createRook('white'), createKnight('white'), createBishop('white'), createQueen('white'), createKing('white'), createBishop('white'), createKnight('white'), createRook('white')],
];

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const games = new Map();

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createGame', () => {
        const gameId = uuidv4();
        games.set(gameId, { players: [socket.id], board: initBoard() });
        socket.join(gameId);
        socket.emit('gameCreated', gameId);
    });

    socket.on('joinGame', (gameId) => {
        const game = games.get(gameId);
        if (game && game.players.length < 2) {
            game.players.push(socket.id);
            socket.join(gameId);
            io.to(gameId).emit('gameJoined', { gameId, players: game.players });
            if (game.players.length === 2) {
                io.to(gameId).emit('gameStart', { board: game.board, currentPlayer: 'white' });
            }
        } else {
            socket.emit('joinError', 'Game not found or already full');
        }
    });

    socket.on('move', ({ gameId, from, to }) => {
        const game = games.get(gameId);
        if (game) {
            // Implement move validation here
            game.board = movePiece(game.board, from, to);
            io.to(gameId).emit('moveMade', { from, to, board: game.board });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Handle player disconnection (e.g., end the game)
    });
});

function initBoard() {
    return initialBoard;
}

function movePiece(board, from, to) {
    const newBoard = board.map(row => [...row]);
    newBoard[to.row][to.col] = newBoard[from.row][from.col];
    newBoard[from.row][from.col] = null;
    return newBoard;
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});