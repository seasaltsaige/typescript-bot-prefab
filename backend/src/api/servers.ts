import { Router } from "express";
import { GuildI, Guilds, UserI, Users } from "../database/models";
import { botGuilds, getManagedGuilds, guildChannels } from "../utils/api";
import WebSocket from "../WebSocket";
const router = Router();

router.get("/:id/channels", async (req, res) => {
    const { id } = req.params;
    const channels = await guildChannels(id);
    const sameGuildChannels = channels.filter(c => (c.guild_id === id) && (c.type === 0));
    return res.send(sameGuildChannels);
});

router.post("/:id/prefix", async (req, res) => {
    const { id } = req.params;
    const { prefix } = req.body;

    const guild = <GuildI>(await Guilds.findOne({ gId: id }));
    if (guild === null) return res.status(404).send({ status: 404, message: "Guild not found" });

    guild.prefix = prefix;

    try {
        await guild.updateOne(guild);
    } catch (err) {
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }

    return res.send(guild);

});


router.post("/:id/message", async (req, res) => {

    const io = WebSocket.getSocket();
    io.emit("test", "Hi");
    console.log("a");

});


router.get("/:id", async (req, res) => {

    const gId = req.params.id;

    let Guild = await Guilds.findOne({ gId });

    if (Guild === null) return res.status(404).send({ status: 404, message: "Guild not found" }); //{

    return res.send(Guild);
});

router.get("/all/managed", async (req, res) => {
    //@ts-ignore
    const user: UserI = await Users.findOne({ uId: req.user.uId });
    if (user !== null) {
        const managedGuilds = await getManagedGuilds(user.guilds);
        res.send(managedGuilds);
    } else
        return res.status(401).send({ status: 401, message: "Unauthorized" });
});

router.post("/:id/update", async (req, res) => {
    const newSettings = req.body;
    const gId = req.params.id;

    console.log(newSettings);

    const guild = await Guilds.findOne({ gId });

    await guild.updateOne(newSettings.settings);

    return res.status(200).send({ message: "Success" });

});

export default router;