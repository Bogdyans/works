'use client'

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MandelbrotViewer() {
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [xMin, setXMin] = useState(-2);
    const [xMax, setXMax] = useState(1);
    const [yMin, setYMin] = useState(-1.5);
    const [yMax, setYMax] = useState(1.5);
    const [maxIterations, setMaxIterations] = useState(1000);

    const fetchMandelbrot = async () => {
        setLoading(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = canvas.width;
        const height = canvas.height;

        if (maxIterations > 1001 || width+height > 2000) {return;}

        const response = await fetch('/api/mandelbrot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                xMin,
                xMax,
                yMin,
                yMax,
                width,
                height,
                maxIterations,
            }),
        });

        const data = await response.json();
        const pixelData = new Uint8ClampedArray(data.pixelData);

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const imageData = new ImageData(pixelData, width, height);
            ctx.putImageData(imageData, 0, 0);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMandelbrot();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Mandelbrot Set Viewer</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <Label htmlFor="xMin">X Min</Label>
                    <Input
                        id="xMin"
                        type="number"
                        value={xMin}
                        onChange={(e) => setXMin(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="xMax">X Max</Label>
                    <Input
                        id="xMax"
                        type="number"
                        value={xMax}
                        onChange={(e) => setXMax(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="yMin">Y Min</Label>
                    <Input
                        id="yMin"
                        type="number"
                        value={yMin}
                        onChange={(e) => setYMin(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="yMax">Y Max</Label>
                    <Input
                        id="yMax"
                        type="number"
                        value={yMax}
                        onChange={(e) => setYMax(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="maxIterations">Max Iterations</Label>
                    <Input
                        id="maxIterations"
                        type="number"
                        value={maxIterations}
                        onChange={(e) => setMaxIterations(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <Button onClick={fetchMandelbrot} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Mandelbrot'}
            </Button>
            <div className="mt-4">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="border border-gray-300"
                ></canvas>
            </div>
        </div>
    );
}

