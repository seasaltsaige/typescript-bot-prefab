import { BaseClient, Message } from "discord.js";
import BaseCommand from "../../Utils/Base/BaseCommand";

export default class Help extends BaseCommand {
    constructor() {
        super({
            aliases: ["halp"],
            category: "general",
            cooldown: 3,
            name: "help",
            permissions: ["SEND_MESSAGES"],
        });
    }

    public async run(client: BaseClient, message: Message, args: string[]) {
        return message.channel.send("Help Menu");
    }
}