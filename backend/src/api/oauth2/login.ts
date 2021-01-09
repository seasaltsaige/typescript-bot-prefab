import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("discord"));
router.get("/redirect", passport.authenticate("discord"), async (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
});


export default router;