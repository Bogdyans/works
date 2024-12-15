import { ChessBoard, ChessPiece } from './types';

const createPawn = (color: 'white' | 'black'): ChessPiece => ({ type: 'pawn', color });
const createRook = (color: 'white' | 'black'): ChessPiece => ({ type: 'rook', color });
const createKnight = (color: 'white' | 'black'): ChessPiece => ({ type: 'knight', color });
const createBishop = (color: 'white' | 'black'): ChessPiece => ({ type: 'bishop', color });
const createQueen = (color: 'white' | 'black'): ChessPiece => ({ type: 'queen', color });
const createKing = (color: 'white' | 'black'): ChessPiece => ({ type: 'king', color });

export const initialBoard: ChessBoard = [
    [createRook('black'), createKnight('black'), createBishop('black'), createQueen('black'), createKing('black'), createBishop('black'), createKnight('black'), createRook('black')],
    [createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black'), createPawn('black')],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white'), createPawn('white')],
    [createRook('white'), createKnight('white'), createBishop('white'), createQueen('white'), createKing('white'), createBishop('white'), createKnight('white'), createRook('white')],
];

