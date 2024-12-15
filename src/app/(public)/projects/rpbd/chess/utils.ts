import { ChessBoard, Position, ChessPiece, PieceColor } from './types';

function isWithinBoard(pos: Position): boolean {
    return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
}

function isDiagonalMove(from: Position, to: Position): boolean {
    return Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
}

function isStraightMove(from: Position, to: Position): boolean {
    return from.row === to.row || from.col === to.col;
}

function isPathClear(board: ChessBoard, from: Position, to: Position): boolean {
    const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;

    while (currentRow !== to.row || currentCol !== to.col) {
        if (board[currentRow][currentCol] !== null) {
            return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
    }

    return true;
}

function isValidPawnMove(board: ChessBoard, from: Position, to: Position, piece: ChessPiece): boolean {
    const direction = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;

    // Moving forward
    if (from.col === to.col && board[to.row][to.col] === null) {
        if (to.row === from.row + direction) {
            return true;
        }
        if (from.row === startRow && to.row === from.row + 2 * direction && board[from.row + direction][from.col] === null) {
            return true;
        }
    }

    // Capturing diagonally
    if (Math.abs(from.col - to.col) === 1 && to.row === from.row + direction) {
        const targetPiece = board[to.row][to.col];
        return targetPiece !== null && targetPiece.color !== piece.color;
    }

    return false;
}

function isValidRookMove(board: ChessBoard, from: Position, to: Position): boolean {
    return isStraightMove(from, to) && isPathClear(board, from, to);
}

function isValidKnightMove(from: Position, to: Position): boolean {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidBishopMove(board: ChessBoard, from: Position, to: Position): boolean {
    return isDiagonalMove(from, to) && isPathClear(board, from, to);
}

function isValidQueenMove(board: ChessBoard, from: Position, to: Position): boolean {
    return (isStraightMove(from, to) || isDiagonalMove(from, to)) && isPathClear(board, from, to);
}

function isValidKingMove(from: Position, to: Position): boolean {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
    return rowDiff <= 1 && colDiff <= 1;
}

export function isValidMove(board: ChessBoard, from: Position, to: Position): boolean {
    if (!isWithinBoard(from) || !isWithinBoard(to)) {
        return false;
    }

    const piece = board[from.row][from.col];
    if (!piece) return false;

    const targetPiece = board[to.row][to.col];
    if (targetPiece && targetPiece.color === piece.color) {
        return false;
    }

    switch (piece.type) {
        case 'pawn':
            return isValidPawnMove(board, from, to, piece);
        case 'rook':
            return isValidRookMove(board, from, to);
        case 'knight':
            return isValidKnightMove(from, to);
        case 'bishop':
            return isValidBishopMove(board, from, to);
        case 'queen':
            return isValidQueenMove(board, from, to);
        case 'king':
            return isValidKingMove(from, to);
        default:
            return false;
    }
}

export function movePiece(board: ChessBoard, from: Position, to: Position): ChessBoard {
    const newBoard = board.map(row => [...row]);
    newBoard[to.row][to.col] = newBoard[from.row][from.col];
    newBoard[from.row][from.col] = null;
    return newBoard;
}

function findKing(board: ChessBoard, color: PieceColor): Position | null {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.type === 'king' && piece.color === color) {
                return { row, col };
            }
        }
    }
    return null;
}

export function isKingInCheck(board: ChessBoard, kingColor: PieceColor): boolean {
    const kingPosition = findKing(board, kingColor);
    if (!kingPosition) return false;

    const opponentColor = kingColor === 'white' ? 'black' : 'white';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.color === opponentColor) {
                if (isValidMove(board, { row, col }, kingPosition)) {
                    return true;
                }
            }
        }
    }

    return false;
}

export function canDefendKing(board: ChessBoard, kingColor: PieceColor): boolean {
    for (let fromRow = 0; fromRow < 8; fromRow++) {
        for (let fromCol = 0; fromCol < 8; fromCol++) {
            const piece = board[fromRow][fromCol];
            if (piece && piece.color === kingColor) {
                for (let toRow = 0; toRow < 8; toRow++) {
                    for (let toCol = 0; toCol < 8; toCol++) {
                        if (isValidMove(board, { row: fromRow, col: fromCol }, { row: toRow, col: toCol })) {
                            const newBoard = movePiece(board, { row: fromRow, col: fromCol }, { row: toRow, col: toCol });
                            if (!isKingInCheck(newBoard, kingColor)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

export function isValidMoveConsideringCheck(board: ChessBoard, from: Position, to: Position): boolean {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    if (isValidMove(board, from, to)) {
        const newBoard = movePiece(board, from, to);
        return !isKingInCheck(newBoard, piece.color);
    }

    return false;
}

