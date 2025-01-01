function format(template: string, ...args: string[]): string {
    return template.replace(/{}/g, () => (args.length ? args.shift() : '') as string);
}

export { format };
