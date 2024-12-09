'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Message } from '@/app/(public)/projects/libs/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"




export default function Component() {
    const [messages, setMessages] = useState<Message[]>([])
    const [currentMessage, setCurrentMessage] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSendMessage = async () => {
        if (!currentMessage.trim()) return

        const newUserMessage: Message = {
            id: Date.now(),
            author: 'User',
            message: currentMessage,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            clients: true,
        }

        setMessages(prevMessages => [...prevMessages, newUserMessage])
        setCurrentMessage("")

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: currentMessage }),
            });

            const data = await response.json();

            const newBotMessage: Message = {
                id: Date.now() + 1,
                author: 'Bot',
                message: data.message,
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                clients: false,
            }

            setMessages(prevMessages => [...prevMessages, newBotMessage])
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    return (
        <>
            <Card className="w-full h-[550px] flex flex-col">
                <CardHeader className="border-b flex-shrink-0">
                    <CardTitle className="text-2xl font-bold">Scenery System</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Help</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Available Commands</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <p>/hello: Greet the bot</p>
                                <p>/time: Get the current time</p>
                                <p>/echo [message]: Echo back your message</p>
                                <p>/help: Show available commands</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>


                <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
                    <div className="flex-grow overflow-y-auto">
                        <div className="space-y-4 p-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex flex-col space-y-1 ${
                                        message.author === "User" ? 'items-end' : 'items-start'
                                    }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-semibold">{message.author}</span>
                                        <span className="text-xs text-muted-foreground">{message.time}</span>
                                    </div>

                                    <div
                                        className={`rounded-xl px-4 py-2 max-w-[80%] break-words ${
                                            message.author === "User"
                                                ? 'bg-primary text-primary-foreground ml-auto'
                                                : 'bg-muted mr-auto'
                                        }`}
                                    >
                                        {message.message}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef}/>
                        </div>
                    </div>

                    <div className="p-4 border-t flex-shrink-0">
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Type your message..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />

                            <Button onClick={handleSendMessage}>Send</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

