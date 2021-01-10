import { Document, model, Schema } from "mongoose";

export interface Users extends Document {
    uId: string;
    avatar: string;
    tag: string;
    guilds: any[];
}

const User = new Schema({
    uId: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true,
    },
});

export default model<Users>("users", User);