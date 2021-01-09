import { Message } from "discord.js";
import BaseClient from "../Utils/Base/BaseClient";
import BaseEvent from "../Utils/Base/BaseEvent";

export default class Msg extends BaseEvent {
    constructor() {
        super({
            description: "Message Event",
            event: "message",
        });
    }

    public async run(client: BaseClient, message: Message) {

        const args = message.content.trim().split(" ");
        const command = args.shift();

        const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (commandFile !== undefined)
            await commandFile.run(client, message, args);
    }
}