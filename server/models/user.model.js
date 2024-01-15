import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            // required: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 300
    },
    blogs: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }


}, { timestamps: true });

const User = model('User', userSchema);

export default User;
