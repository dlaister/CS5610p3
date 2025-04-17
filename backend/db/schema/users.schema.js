// TODO -- users
import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.model("User", UserSchema);
