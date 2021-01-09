import { Client, ClientOptions, Collection } from "discord.js";
import BaseCommand from "./BaseCommand";
import CommandHandler from "../Handlers/CommandHandler";
import EventHandler from "../Handlers/EventHandler";

export const categories = ["general"];

export default class BaseClient extends Client {

    private _prefix: string = "?";

    public commands: Collection<string, BaseCommand> = new Collection<string, BaseCommand>();
    public aliases: Collection<string, string> = new Collection<string, string>();

    constructor(baseOptions: ClientOptions) {
        super(baseOptions);
    }

    public get prefix() {
        return this._prefix;
    }
    public set prefix(value: string) {
        this._prefix = value;
    }

    public async start() {

        CommandHandler(this, "src/commands", categories);
        EventHandler(this, "src/events");

        await import("../../database/database");

        this.login(process.env.TOKEN);
    }

}