'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Message } from './types'
import { MOCK_MSGS} from "./constants";


export default function Component() {
    const [messages, setMessages] = useState<Message[]>(MOCK_MSGS)
    const [access, setAccess] = useState(false)
    const [name, setName] = useState("")
    const [currentMessage, setCurrentMessage] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSendMessage = () => {
        if (!currentMessage.trim()) return

        const newMessage: Message = {
            id: messages.length + 1,
            author: name,
            message: currentMessage,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            clients: true,
        }

        setMessages([...messages, newMessage])
        setCurrentMessage("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    if (!access) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Join Chat</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Choose your name
                        </label>

                        <Input
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full"
                        onClick={() => {
                            if (name.trim()) {
                                setAccess(true)
                            }
                        }}
                    >
                        Enter Chat
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full h-[550px] flex flex-col">
            <CardHeader className="border-b flex-shrink-0">
                <CardTitle className="text-2xl font-bold">Chat</CardTitle>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
                <div className="flex-grow overflow-y-auto">
                    <div className="space-y-4 p-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex flex-col space-y-1 ${
                                    message.author === name ? 'items-end' : 'items-start'
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold">{message.author}</span>
                                    <span className="text-xs text-muted-foreground">{message.time}</span>
                                </div>

                                <div
                                    className={`rounded-xl px-4 py-2 max-w-[80%] break-words ${
                                        message.author === name
                                            ? 'bg-primary text-primary-foreground ml-auto'
                                            : 'bg-muted mr-auto'
                                    }`}
                                >
                                    {message.message}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
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
    )
}