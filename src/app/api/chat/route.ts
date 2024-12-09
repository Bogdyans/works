import { NextResponse } from 'next/server';
import {COMMANDS} from "./const";

export async function POST(req: Request) {
    const { message } = await req.json();
    const [command, ...args] = message.split(' ');

    const matchedCommand = COMMANDS.find((cmd) => cmd.trigger === command);

    if (matchedCommand) {
        const response = matchedCommand.action(args.join(' '));
        return NextResponse.json({ message: response });
    } else {
        return NextResponse.json({ message: "Извините, как искусственный интеллект я не могу удовлетворить ваш запрос. Однако, если есть ещё какие-то вопросы - смело обращайтесь." });
    }
}

