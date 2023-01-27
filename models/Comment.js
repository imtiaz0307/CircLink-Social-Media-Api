import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
    {
        postid: {
            type: Schema.Types.ObjectId,
            ref: 'post'
        },
        userid: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        content: {
            type: String,
            required: true
        },
        likes: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

export const Comment = model('comment', commentSchema)