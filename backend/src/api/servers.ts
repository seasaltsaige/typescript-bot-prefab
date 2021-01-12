import { Router } from "express";
import { GuildI, Guilds, UserI, Users } from "../database/models";
import { botGuilds, getManagedGuilds } from "../utils/api";
const router = Router();


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

export default router;