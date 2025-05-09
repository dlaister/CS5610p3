import {Schema} from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true}
}, {timestamps: true});

export default userSchema;

