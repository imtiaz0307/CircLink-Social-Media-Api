import { User } from "../../models/User.js";
import { Post } from "../../models/Post.js";
import { Comment } from "../../models/Comment.js";
import { validationResult } from "express-validator";


export const createComment = async (req, res) => {
    // if something goes wrong during validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;
    try {
        // finding user by id
        const user = await User.findById(req.user.id).select('name userName profilePicture')

        // finding post by id
        const post = await Post.findById(req.params.id)

        // creating comment
        const comment = await Comment.create({
            postid: post.id,
            user,
            content
        })

        // pushing comment to Post comments
        await Post.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: comment.id
            }
        })

        // saving comment
        await comment.save()

        // response
        res.status(200).send(`You commented ${content} on ${post.user.userName}'s post`)
    } catch (error) {
        return res.status(500).send(error)
    }
}