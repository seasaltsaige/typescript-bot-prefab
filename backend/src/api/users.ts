import { Router } from "express";
import { Users } from "../database/models";
const router = Router();


router.get("/:uId", async (req, res) => {

    const { uId } = req.params;

    const User = await Users.findOne({ uId });

    if (!User) return res.status(404).send({ status: 404, message: "That user doesn't exist in the database." });

    return res.send(User);
});

router.delete("/delete/:uId", async (req, res) => {

    const { uId } = req.params;

    try {
        await Users.deleteOne({ uId });
    } catch (err) {
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
});

export default router;