import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
    {
        postid: {
            type: Schema.Types.ObjectId,
            ref: 'post'
        },
        user: {
            type: Object,
            required: true
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