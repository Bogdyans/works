export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
    type: PieceType;
    color: PieceColor;
}

export type ChessBoard = (ChessPiece | null)[][];

export interface Position {
    row: number;
    col: number;
}

