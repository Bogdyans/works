import React from 'react';
import { ChessPiece as ChessPieceType } from '../types';

interface ChessPieceProps {
    piece: ChessPieceType;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => {
    const getPieceSymbol = (piece: ChessPieceType) => {
        const symbols: Record<ChessPieceType['type'], string> = {
            pawn: '♟',
            rook: '♜',
            knight: '♞',
            bishop: '♝',
            queen: '♛',
            king: '♚',
        };
        return symbols[piece.type];
    };

    return (
        <div className={`text-4xl ${piece.color === 'white' ? 'text-gray-100' : 'text-gray-900'} select-none`}>
            {getPieceSymbol(piece)}
        </div>
    );
};

