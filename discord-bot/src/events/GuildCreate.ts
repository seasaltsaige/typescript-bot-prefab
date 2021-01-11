import { Guild } from "discord.js";
import BaseClient from "../Utils/Base/BaseClient";
import BaseEvent from "../Utils/Base/BaseEvent";
import { default as Guilds } from "../database/Schemas/Guild";

export default class GuildCreate extends BaseEvent {
    constructor() {
        super({
            description: "Guild Create Event",
            event: "guildCreate",
        });
    }

    public async run(client: BaseClient, guild: Guild) {
        await Guilds.create({
            logChannel: "none",
            prefix: "?",
            gId: guild.id,
        });
    }
}