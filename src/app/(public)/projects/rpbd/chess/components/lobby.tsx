"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LobbyProps {
    onJoinGame: (gameId: string, playerName: string) => void;
    onCreateGame: (playerName: string) => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onJoinGame, onCreateGame }) => {
    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');

    const handleJoinGame = (e: React.FormEvent) => {
        e.preventDefault();
        if (gameId && playerName) {
            onJoinGame(gameId, playerName);
        }
    };

    const handleCreateGame = () => {
        if (playerName) {
            onCreateGame(playerName);
        }
    };

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>Chess Lobby</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleJoinGame} className="space-y-4">
                    <div>
                        <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
                            Your Name
                        </label>
                        <Input
                            id="playerName"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="gameId" className="block text-sm font-medium text-gray-700">
                            Game ID
                        </label>
                        <Input
                            id="gameId"
                            value={gameId}
                            onChange={(e) => setGameId(e.target.value)}
                            placeholder="Enter game ID to join"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Join Game
                    </Button>
                </form>
                <div className="mt-4">
                    <Button onClick={handleCreateGame} className="w-full">
                        Create New Game
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

