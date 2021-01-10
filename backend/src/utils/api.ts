import axios from "axios";

const mainRoute = "https://discord.com/api/v6";
const token = process.env.TOKEN;

function botGuilds() {
    const response = axios.get(`${mainRoute}/users/@me/guilds`, {
        method: "GET",
        headers: {
            Authorization: `Bot ${token}`,
        },
    });
    return response;
}

function getSameGuilds(userGuilds: any[], botGuilds: any[]) {
    return userGuilds.filter(
        (g) =>
            botGuilds.find(
                (guild) =>
                    guild.id === g.id)
            &&
            ((g.permissions & 0x20)) === 0x20
    );
}

function getManagedGuilds(userGuilds: any[]) {
    const managedGuilds = userGuilds.filter(g => (g.permissions & 0x20) === 0x20);
    return managedGuilds;
}

export {
    botGuilds,
    getSameGuilds,
    getManagedGuilds,
}