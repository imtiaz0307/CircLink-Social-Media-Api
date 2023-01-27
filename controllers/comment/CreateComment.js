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
        // finding post by id
        const post = await Post.findById(req.params.postid)

        // creating comment
        const comment = await Comment.create({
            postid: post.id,
            userid: req.user.id,
            content
        })

        // pushing comment to Post comments
        await Post.findByIdAndUpdate(req.params.postid, {
            $push: {
                comments: comment.id
            }
        })

        // saving comment
        await comment.save()

        // response
        res.status(200).json({ success: `You commented ${content}.` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ erorr: error })
    }
}