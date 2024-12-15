import { NextResponse } from 'next/server';

import {COMMANDS, detectCommand} from "./const";
import {Command} from "@/app/api/chat/types";

export async function POST(req: Request) {
    const { message } = await req.json();
    const lowercaseMessage: string = message.toLowerCase();
    const [firstWord, rest] = lowercaseMessage.split(' ');
    let usedFirstWord = false;

    let resp: string = "";

    //bye
    if (COMMANDS[1].keyWords.includes(firstWord)) {
        const byeCommand = COMMANDS.find((cmd) => cmd.trigger === 'bye') as Command;
        return NextResponse.json({ message: byeCommand.action('') });
    }

    //greeting
    if (COMMANDS[0].keyWords.includes(firstWord)) {
        const greetingCommand = COMMANDS.find((cmd) => cmd.trigger === 'greeting') as Command;
        resp = resp.concat(greetingCommand.action(''));

        if (!rest)
            return NextResponse.json({ message: resp });

        usedFirstWord = true;
        resp = resp.concat("Of course! ");
    }

    console.log(rest)

    const matchedCommand = detectCommand(usedFirstWord? rest : lowercaseMessage);
    //const matchedCommand = COMMANDS.find((cmd) => cmd.trigger === rest);
    console.log(matchedCommand)

    if (matchedCommand) {
        resp = resp.concat(matchedCommand.action(rest));
        return NextResponse.json({ message: resp });
    } else {
        return NextResponse.json({ message: "Извините, как искусственный интеллект я не могу удовлетворить ваш запрос. Однако, если есть ещё какие-то вопросы - смело обращайтесь." });
    }
}

