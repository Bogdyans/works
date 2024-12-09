export type Command = {
    trigger: string;
    description: string;
    action: (args: string) => string;
};