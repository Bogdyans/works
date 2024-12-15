import { NextRequest, NextResponse } from 'next/server';

function mandelbrot(x0: number, y0: number, maxIter: number): number {
    let x = 0;
    let y = 0;
    let iter = 0;

    while (x * x + y * y < 4 && iter < maxIter) {
        const xTemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xTemp;
        iter++;
    }

    return iter;
}

export async function POST(req: NextRequest) {
    const { xMin, xMax, yMin, yMax, width, height, maxIterations } = await req.json();

    const pixelData = new Uint8ClampedArray(width * height * 4);

    for (let py = 0; py < height; py++) {
        for (let px = 0; px < width; px++) {
            const x = xMin + (px / width) * (xMax - xMin);
            const y = yMin + (py / height) * (yMax - yMin);

            const iter = mandelbrot(x, y, maxIterations);
            const color = iter === maxIterations ? 0 : 255 * Math.sqrt(iter / maxIterations);

            const index = (py * width + px) * 4;
            pixelData[index] = color;
            pixelData[index + 1] = color;
            pixelData[index + 2] = color;
            pixelData[index + 3] = 255;
        }
    }

    return NextResponse.json({ pixelData: Array.from(pixelData) });
}
