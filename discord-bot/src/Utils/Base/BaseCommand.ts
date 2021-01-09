import { Message, PermissionResolvable } from "discord.js";
import BaseClient from "./BaseClient";

interface BaseCommandOptions {
    name: string;
    aliases: string[];
    permissions: PermissionResolvable[];
    category: string;
    cooldown: number | string;
}

export default abstract class BaseCommand {
    constructor(public options: BaseCommandOptions) { };
    public abstract run(client: BaseClient, message: Message, args: string[]): Promise<any>;
}