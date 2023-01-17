import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        user: {
            type: Object,
            required: true
        },
        caption: {
            type: String,
            default: ''
        },
        file: {
            type: String,
            default: ''
        },
        likes: {
            type: Array,
            default: []
        },
        comments: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

export const Post = model('post', postSchema)