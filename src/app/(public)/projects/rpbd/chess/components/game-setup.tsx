import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface GameSetupProps {
    onCreateGame: () => void;
    onJoinGame: (gameId: string) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onCreateGame, onJoinGame }) => {
    const [gameId, setGameId] = useState('');

    return (
        <div className="space-y-4">
            <Button onClick={onCreateGame}>Create New Game</Button>
            <div className="flex space-x-2">
                <Input
                    type="text"
                    placeholder="Enter Game ID"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                />
                <Button onClick={() => onJoinGame(gameId)}>Join Game</Button>
            </div>
        </div>
    );
};

