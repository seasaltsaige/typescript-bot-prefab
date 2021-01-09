import BaseClient from "../Utils/Base/BaseClient";
import BaseEvent from "../Utils/Base/BaseEvent";

export default class Ready extends BaseEvent {
    constructor() {
        super({
            description: "Ready Event",
            event: "ready",
        });
    }

    public async run(client: BaseClient) {
        console.log(`Discord Bot > ${client.user.username} logged into ${client.guilds.cache.size} servers and ${client.users.cache.size} users.`);
    }
}