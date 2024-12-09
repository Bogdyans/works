import {Command} from "@/app/api/chat/types";

export const COMMANDS: Command[] = [
    {
        trigger: '/hello',
        description: 'Greet the bot',
        action: () => 'Hello! How can I assist you today?',
    },
    {
        trigger: '/time',
        description: 'Get the current time',
        action: () => `The current time is ${new Date().toLocaleTimeString()}.`,
    },
    {
        trigger: '/echo',
        description: 'Echo back your message',
        action: (args) => `You said: ${args}`,
    },
    {
        trigger: '/help',
        description: 'Show available commands',
        action: () => {
            return COMMANDS
                .map((cmd) => `${cmd.trigger}: ${cmd.description}`)
                .join('\n');
        },
    },
];