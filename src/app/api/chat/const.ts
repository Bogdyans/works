import {Command} from "@/app/api/chat/types";



export const COMMANDS: Command[] = [
    {
        trigger: 'greeting',
        keyWords: ['hello', 'hi', 'hey', 'greetings', 'howdy', 'hola', 'privet', 'gmorning'],
        description: 'Respond to greeting',
        action: () => 'Hello user! ',
    },
    {
        trigger: 'bye',
        keyWords: ['bye', 'bb', 'goodbye', 'byebye', 'cya', 'seeyou', 'sayonara'],
        description: 'Say goodbye',
        action: () => 'Goodbye user! Wish you luck!',
    },
    {
        trigger: 'time',
        keyWords: ['time'],
        description: 'Get the current time',
        action: () => `The current time is ${new Date().toLocaleTimeString()}.`,
    },
    {
        trigger: '/help',
        keyWords: ['help', 'what you do', 'man', 'manual'],
        description: 'Show available commands',
        action: () => {
            return COMMANDS
                .map((cmd) => `${cmd.trigger}: ${cmd.description}`)
                .join(' | ');
        },
    },
];

export function detectCommand(req: string): Command | null {
    const [command, ...args] = req.split(' ');

    let res;

    COMMANDS.forEach((c) => {
        console.log(c.trigger);

        if (c.keyWords.includes(command)){
            res = c;
            return;
        }
    })

    return res ? res : null;
}