import BaseClient from "../Utils/Base/BaseClient";
import BaseEvent from "../Utils/Base/BaseEvent";
import { io } from "socket.io-client";
export default class Ready extends BaseEvent {
    constructor() {
        super({
            description: "Ready Event",
            event: "ready",
        });
    }

    public async run(client: BaseClient) {

        const socket = io("http://localhost:4000");

        socket.on("test", (data: any) => {
            console.log("HIIII");
        });

        console.log(`Discord Bot > ${client.user.username} logged into ${client.guilds.cache.size} servers and ${client.users.cache.size} users.`);
    }
}