import axios from "axios";
import { GuildI, Guilds } from "../database/models";

const mainRoute = "https://discord.com/api/v6";
const token = process.env.TOKEN;

async function botGuilds() {
    const response = <GuildI[]>await Guilds.find();
    return response;
}

function getSameGuilds(userGuilds: any[], botGuilds: GuildI[]) {

    return userGuilds.filter(
        (g) =>
            botGuilds.find(
                (guild) =>
                    guild.gId === g.id)
            &&
            ((g.permissions & 0x20)) === 0x20
    );
}

async function getManagedGuilds(userGuilds: any[]) {
    const managedGuilds = userGuilds.filter(g => (g.permissions & 0x20) === 0x20);
    const allServers = await botGuilds();


    const unique = [];
    const userArrIds = managedGuilds.map(o => o.id);
    const botArrIds = allServers.map(o => o.gId);
    const uniqueIds = userArrIds.filter((o) => botArrIds.indexOf(o) === -1);
    for (let i = 0; i < managedGuilds.length; i++) {
        const userArrObject = managedGuilds[i];
        if (uniqueIds.includes(userArrObject.id)) unique.push(userArrObject);
    }

    return unique;
}

export {
    botGuilds,
    getSameGuilds,
    getManagedGuilds,
}