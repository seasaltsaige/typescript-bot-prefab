import { Router } from "express";
import { botGuilds, getSameGuilds } from "../utils/api";
import { UserI, Users } from "../database/models";

const router = Router();

// router.get("/guilds/all", async (req, res) => {
//     try {
//         let bGuilds = await botGuilds();
//         console.log(bGuilds.data);
//         return res.send(bGuilds.data);
//     } catch (err) {
//         console.log(err);
//         return res.send(err);
//     }
// })

router.get("/guilds", async (req, res) => {
    const guilds = await botGuilds();
    //@ts-ignore
    const user: UserI = await Users.findOne({ uId: req.user.uId });

    if (user !== null) {
        const userGuilds = user.guilds;
        const sameGuilds = getSameGuilds(userGuilds, guilds.data);
        return res.send({
            sameGuilds,
            allBotGuilds: guilds.data,
        });
    } else
        return res.status(401).send({ status: 401, message: "Unauthorized" });

});

export default router;