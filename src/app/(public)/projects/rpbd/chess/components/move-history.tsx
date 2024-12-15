import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

interface MoveHistoryProps {
    moves: string[];
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
    return (
        <div className="w-64 h-96 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Move History</h2>
            <ScrollArea className="h-[calc(100%-2rem)]">
                <div className="space-y-2">
                    {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, index) => (
                        <div key={index} className="flex gap-4">
                            <span className="w-8 text-gray-500">{index + 1}.</span>
                            <span className="w-20 font-mono">{moves[index * 2] || ''}</span>
                            <span className="w-20 font-mono">{moves[index * 2 + 1] || ''}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

