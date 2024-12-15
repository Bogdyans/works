import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const { message } = await req.json();

    const apiKey = 'c6b14945361510aad64b85619a25de46'; // Замените на ваш API ключ
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${message}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        return NextResponse.json({message: `Weather in ${message}: ${data.weather[0].description}, ${data.main.temp}°C hum: ${data.main.humidity}%`});
    } catch (error) {
        return NextResponse.json({message: "Error, service doesn't work"});
    }
}
