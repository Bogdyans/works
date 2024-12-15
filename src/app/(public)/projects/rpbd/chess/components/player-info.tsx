import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PlayerInfoProps {
    name: string;
    color: 'white' | 'black';
    isCurrentTurn: boolean;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, color, isCurrentTurn }) => {
    return (
        <Card className={`w-64 ${isCurrentTurn ? 'bg-blue-100' : ''}`}>
            <CardContent className="flex items-center p-4">
                <Avatar className="h-10 w-10 mr-4">
                    <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-gray-500 capitalize">{color}</p>
                </div>
            </CardContent>
        </Card>
    );
};

