import cors from "cors";
import passport from "passport";
import session from "express-session";
import store from "connect-mongo";
import express, { json, urlencoded } from "express";
import { connection } from "mongoose";
import { UserRoutes, LoginRoutes, BotRoutes, ServerRoutes } from "./api";

const Store = store(session);

const app = express();

import("./database/database");
import "./api/oauth2/strategies/discordStrategies";

app.use(
    cors({
        origin: "http://localhost:3000",
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
        store: new Store({ mongooseConnection: connection })
    }),
);

import http from "http";
import WebSocket from "./WebSocket";
const server = http.createServer(app);
WebSocket.setSocket(server);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", UserRoutes);
app.use("/api/login", LoginRoutes);
app.use("/api/bot", BotRoutes);
app.use("/api/servers", ServerRoutes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Backend > Successfully started server at https://localhost:${process.env.APP_PORT}`);
});