import { Router } from "express";
import { Guilds, UserI, Users } from "../database/models";
import { botGuilds, getManagedGuilds } from "../utils/api";
const router = Router();

router.get("/:id", async (req, res) => {

    const gId = req.params.id;

    let Guild = await Guilds.findOne({ gId });

    if (Guild === null) {
        Guild = await Guilds.create({
            gId,
            prefix: "?",
            logChannel: "none",
        });
    }

    return res.send(Guild);
});

router.get("/all/managed", async (req, res) => {
    //@ts-ignore
    const user: UserI = await Users.findOne({ uId: req.user.uId });
    if (user !== null) {
        const managedGuilds = getManagedGuilds(user.guilds);
        res.send(managedGuilds);
    } else
        return res.status(401).send({ status: 401, message: "Unauthorized" });
});

export default router;