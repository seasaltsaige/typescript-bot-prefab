import { Intents } from "discord.js";
import BaseClient from "./Utils/Base/BaseClient";
const Client = new BaseClient({
    ws: {
        intents: Intents.ALL,
    },
});

Client.start();