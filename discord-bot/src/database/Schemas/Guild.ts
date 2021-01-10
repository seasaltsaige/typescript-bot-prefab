import { Document, model, Schema } from "mongoose";

export interface GuildI extends Document {
    gId: string;
    prefix: string;
    logChannel: string;
}

const Guild = new Schema({
    gId: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    logChannel: {
        type: String,
        required: true,
    },
});

export default model<GuildI>("guilds", Guild);