import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ''
        },
        coverPicture: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        followers: {
            type: Array,
            default: []
        },
        following: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

export const User = model('user', userSchema)