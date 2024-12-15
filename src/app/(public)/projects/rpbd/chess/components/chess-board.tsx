"use client"

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChessPiece } from './chess-piece';
import { MoveHistory } from './move-history';
import { GameSetup } from './game-setup';
import { ChessBoard as ChessBoardType, Position, PieceColor } from '../types';
import { initialBoard } from '../const';
import { isValidMoveConsideringCheck, isKingInCheck, canDefendKing, movePiece } from '../utils';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const ChessBoard: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);
    const [playerColor, setPlayerColor] = useState<PieceColor | null>(null);
    const [board, setBoard] = useState<ChessBoardType>(initialBoard);
    const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isCheckmate, setIsCheckmate] = useState<boolean>(false);
    const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
    const [moveHistory, setMoveHistory] = useState<string[]>([]);

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('gameCreated', (id: string) => {
            setGameId(id);
            setPlayerColor('white');
        });

        socket.on('gameJoined', ({ gameId, players }) => {
            setGameId(gameId);
            setPlayerColor(players[0] === socket.id ? 'white' : 'black');
        });

        socket.on('gameStart', ({ board, currentPlayer }) => {
            setBoard(board);
            setCurrentPlayer(currentPlayer);
        });

        socket.on('moveMade', ({ from, to, board }) => {
            setBoard(board)

            addMoveToHistory(from, to);
            setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        });

        return () => {
            socket.off('gameCreated');
            socket.off('gameJoined');
            socket.off('gameStart');
            socket.off('moveMade');
        };
    }, [socket, currentPlayer]);

    useEffect(() => {
        const kingInCheck = isKingInCheck(board, currentPlayer);
        setIsCheck(kingInCheck);
        if (kingInCheck && !canDefendKing(board, currentPlayer)) {
            setIsCheckmate(true);
        } else {
            setIsCheckmate(false);
        }
    }, [board, currentPlayer]);

    const createGame = () => {
        if (socket) socket.emit('createGame');
    };

    const joinGame = (id: string) => {
        if (socket) socket.emit('joinGame', id);
    };

    const calculatePossibleMoves = (position: Position) => {
        const moves: Position[] = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (isValidMoveConsideringCheck(board, position, { row, col })) {
                    moves.push({ row, col });
                }
            }
        }
        return moves;
    };

    const getAlgebraicNotation = (from: Position, to: Position): string => {
        const piece = board[from.row][from.col];
        if (!piece) return '';

        const pieceSymbol = piece.type === 'knight' ? 'N' : piece.type.charAt(0).toUpperCase();
        const fromFile = files[from.col];
        const fromRank = 8 - from.row;
        const toFile = files[to.col];
        const toRank = 8 - to.row;
        const capture = board[to.row][to.col] ? 'x' : '';

        return `${pieceSymbol}${fromFile}${fromRank}${capture}${toFile}${toRank}`;
    };

    const addMoveToHistory = (from: Position, to: Position) => {
        const moveNotation = getAlgebraicNotation(from, to);
        setMoveHistory(prevHistory => [...prevHistory, moveNotation]);
    };

    const handleCellClick = (row: number, col: number) => {
        if (currentPlayer !== playerColor) return;

        if (selectedPiece) {
            if (isValidMoveConsideringCheck(board, selectedPiece, { row, col })) {
                if (socket && gameId) {
                    socket.emit('move', { gameId, from: selectedPiece, to: { row, col } });
                }
                setSelectedPiece(null);
                setPossibleMoves([]);
            } else {
                setSelectedPiece(null);
                setPossibleMoves([]);
            }
        } else {
            const piece = board[row][col];
            if (piece && piece.color === currentPlayer) {
                setSelectedPiece({ row, col });
                setPossibleMoves(calculatePossibleMoves({ row, col }));
            }
        }
    };

    const isPossibleMove = (row: number, col: number) => {
        return possibleMoves.some(move => move.row === row && move.col === col);
    };

    if (!gameId) {
        return <GameSetup onCreateGame={createGame} onJoinGame={joinGame} />;
    }

    return (
        <div className="flex gap-8">
            <Card className="p-8 bg-gray-100">
                <div className="relative">
                    <div className="absolute -left-6 h-full flex flex-col justify-around">
                        {[8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                            <div key={num} className="text-sm text-gray-600">{num}</div>
                        ))}
                    </div>
                    <div className="absolute -bottom-6 w-full flex justify-around">
                        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => (
                            <div key={letter} className="text-sm text-gray-600">{letter}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-8 gap-0 w-96 h-96 border-2 border-gray-700">
                        {board.map((row, rowIndex) =>
                            row.map((piece, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`w-12 h-12 flex items-center justify-center cursor-pointer 
                    ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#F0D9B5]' : 'bg-[#B58863]'}
                    ${selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
                    ${isPossibleMove(rowIndex, colIndex) ? 'ring-2 ring-green-400 ring-opacity-50' : ''}
                  `}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    {piece && <ChessPiece piece={piece} />}
                                    {isPossibleMove(rowIndex, colIndex) && !piece && (
                                        <div className="w-3 h-3 rounded-full bg-green-400 opacity-50"></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="mt-8 text-center font-medium">
                    Current player: <span className="capitalize">{currentPlayer}</span>
                </div>
                <div className="mt-2 text-center">
                    You are playing as: <span className="capitalize">{playerColor}</span>
                </div>
                <div className="mt-2 text-center">
                    Game ID: <span className="font-mono">{gameId}</span>
                </div>
                {isCheck && !isCheckmate && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Check!</AlertTitle>
                        <AlertDescription>
                            The {currentPlayer} king is in check. Defend your king!
                        </AlertDescription>
                    </Alert>
                )}
                {isCheckmate && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Checkmate!</AlertTitle>
                        <AlertDescription>
                            Game over. {currentPlayer === 'white' ? 'Black' : 'White'} wins!
                        </AlertDescription>
                    </Alert>
                )}
            </Card>
            <MoveHistory moves={moveHistory} />
        </div>
    );
};

