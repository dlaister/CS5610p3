// TODO -- users schema

import {Schema} from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default userSchema;

