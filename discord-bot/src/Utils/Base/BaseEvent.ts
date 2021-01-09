import { ClientEvents } from "discord.js";
import BaseClient from "./BaseClient";

interface BaseEventOptions {
    event: keyof ClientEvents;
    description: string;
}

export default abstract class BaseEvent {
    constructor(private options: BaseEventOptions) { };

    public get event() {
        return this.options.event;
    }
    public get description() {
        return this.options.description;
    }

    public abstract run(client: BaseClient, ...args: any): Promise<any>;
}