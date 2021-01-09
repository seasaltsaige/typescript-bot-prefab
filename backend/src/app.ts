import cors from "cors";
import passport from "passport";
import session from "express-session";
import express, { json, urlencoded } from "express";
import { UserRoutes, LoginRoutes } from "./api";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }),
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.APP_SECRET,
        cookie: {
            maxAge: 60 * 1000 * 60 * 24,
        },
        resave: false,
        saveUninitialized: false,
    }),
);

import "./api/oauth2/strategies/discordStrategies";

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", UserRoutes);
app.use("/api/login", LoginRoutes);

import("./database/database");

app.listen(process.env.APP_PORT, () => {
    console.log(`Backend > Successfully started server at https://localhost:${process.env.APP_PORT}`);
});