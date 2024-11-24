'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Paintbrush, Eraser, RotateCcw, X } from 'lucide-react'

interface DrawingData {
    type: 'start' | 'draw' | 'end'
    x: number
    y: number
    color: string
    lineWidth: number
}

interface CanvasPanelProps {
    isOpen: boolean
    onClose: () => void
    onDraw: (drawingData: DrawingData) => void
    canvasRef: React.RefObject<HTMLCanvasElement>
}

export function CanvasPanel({ isOpen, onClose, onDraw, canvasRef }: CanvasPanelProps) {
    const [isDrawing, setIsDrawing] = useState(false)
    const [tool, setTool] = useState<'brush' | 'eraser'>('brush')
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const lastPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = canvas.offsetWidth * window.devicePixelRatio
        canvas.height = canvas.offsetHeight * window.devicePixelRatio

        const context = canvas.getContext('2d')
        if (!context) return

        context.scale(window.devicePixelRatio, window.devicePixelRatio)
        context.lineCap = 'round'
        context.strokeStyle = 'black'
        context.lineWidth = 2
        contextRef.current = context
    }, [canvasRef])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        lastPositionRef.current = { x, y }
        setIsDrawing(true)

        onDraw({
            type: 'start',
            x,
            y,
            color: tool === 'brush' ? 'black' : 'white',
            lineWidth: tool === 'brush' ? 2 : 20
        })
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !contextRef.current || !canvasRef.current) return

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        onDraw({
            type: 'draw',
            x,
            y,
            color: tool === 'brush' ? 'black' : 'white',
            lineWidth: tool === 'brush' ? 2 : 20
        })

        lastPositionRef.current = { x, y }
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        onDraw({
            type: 'end',
            x: lastPositionRef.current.x,
            y: lastPositionRef.current.y,
            color: tool === 'brush' ? 'black' : 'white',
            lineWidth: tool === 'brush' ? 2 : 20
        })
    }

    const clearCanvas = () => {
        if (!contextRef.current || !canvasRef.current) return
        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
    }

    const toggleTool = () => {
        setTool(prevTool => prevTool === 'brush' ? 'eraser' : 'brush')
    }

    return (
        <div className={`fixed top-0 right-0 h-full w-96 bg-background border-l transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
            <div className="p-4 border-b flex justify-between items-center">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTool}
                    >
                        {tool === 'brush' ? <Paintbrush className="h-4 w-4" /> : <Eraser className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={clearCanvas}
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-[calc(100%-65px)] bg-white"
            />
        </div>
    )
}

