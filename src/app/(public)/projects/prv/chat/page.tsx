'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush } from "lucide-react"
import { Message } from './libs/types'
import { CanvasPanel } from './components/canvas'

interface DrawingData {
    type: 'start' | 'draw' | 'end'
    x: number
    y: number
    color: string
    lineWidth: number
}


export default function Component() {
    const [messages, setMessages] = useState<Message[]>([])
    const [access, setAccess] = useState(false)
    const [name, setName] = useState("")
    const [currentMessage, setCurrentMessage] = useState("")
    const [isCanvasOpen, setIsCanvasOpen] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const ws = useRef<WebSocket | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (access) {
            ws.current = new WebSocket('ws://26.184.115.5:8080')

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === 'chat') {
                    setMessages(prevMessages => [...prevMessages, data.message])
                } else if (data.type === 'draw') {
                    handleDrawingMessage(data.drawingData)
                }
            }

            return () => {
                ws.current?.close()
            }
        }
    }, [access])

    useEffect(scrollToBottom, [messages])

    const handleSendMessage = () => {
        if (!currentMessage.trim() || !ws.current) return

        const newMessage: Message = {
            id: Date.now(),
            author: name,
            message: currentMessage,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            clients: true,
        }

        ws.current.send(JSON.stringify({ type: 'chat', message: newMessage }))
        setMessages(prevMessages => [...prevMessages, newMessage])
        setCurrentMessage("")
    }

    const handleDrawingMessage = (drawingData: DrawingData) => {
        if (!canvasRef.current) return
        const context = canvasRef.current.getContext('2d')
        if (!context) return

        context.strokeStyle = drawingData.color
        context.lineWidth = drawingData.lineWidth

        if (drawingData.type === 'start') {
            context.beginPath()
            context.moveTo(drawingData.x, drawingData.y)
        } else if (drawingData.type === 'draw') {
            context.lineTo(drawingData.x, drawingData.y)
            context.stroke()
        } else if (drawingData.type === 'end') {
            context.closePath()
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    const handleDrawing = (drawingData: DrawingData) => {
        if (ws.current) {
            ws.current.send(JSON.stringify({ type: 'draw', drawingData }))
        }
        handleDrawingMessage(drawingData)
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
        <>
            <Card className="w-full h-[550px] flex flex-col">
                <CardHeader className="border-b flex-shrink-0">
                    <CardTitle className="text-2xl font-bold">Chat</CardTitle>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsCanvasOpen(true)}
                    >
                        <Paintbrush className="h-4 w-4"/>
                    </Button>
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
            <CanvasPanel
                isOpen={isCanvasOpen}
                onClose={() => setIsCanvasOpen(false)}
                onDraw={handleDrawing}
                canvasRef={canvasRef}
            />
        </>
    )
}

