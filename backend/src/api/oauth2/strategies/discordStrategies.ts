import passport from "passport";
import { Strategy, Profile } from "passport-discord";
import { Users, UserI } from "../../../database/models";

passport.serializeUser((user: UserI, done: (err: any, user?: UserI) => void) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done: (err: any, user?: UserI) => void) => {
    const User = await Users.findById(id);
    if (User !== null) done(null, User);
});

passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:4000/api/login/redirect",
            scope: ["identify", "guilds"]
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user?: UserI) => void) => {
            const User: UserI = await Users.findOne({ uId: profile.id });

            try {
                if (User !== null) {
                    User.avatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=64`.includes("null")
                        ? "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
                        : `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=64`;

                    User.tag = `${profile.username}#${profile.discriminator}`;
                    User.guilds = profile.guilds;

                    await User.updateOne(User);
                    return done(null, User);
                } else {
                    const newUser = await Users.create({
                        uId: profile.id,
                        tag: `${profile.username}#${profile.discriminator}`,
                        avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=64`.includes("null")
                            ? "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
                            : `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=64`,
                        guilds: profile.guilds,
                    });
                    return done(null, newUser);
                }
            } catch (err) {
                done(err, null);
            }
        }
    )
);