export type Command = {
    trigger: string;
    keyWords: string[];
    description: string;
    action: (args: string) => string;
};