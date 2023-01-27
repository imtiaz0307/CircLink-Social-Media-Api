import { User } from "../../models/User.js";
import { Comment } from "../../models/Comment.js";

export const likeUnlikeComment = async (req, res) => {
    try {
        // finding user by id
        const user = await User.findById(req.user.id)

        // checking if comment exists
        const comment = await Comment.findById(req.params.commentid)
        if (!comment) return res.status(404).json({ error: 'No comment found.' })

        // if user has already like the comment
        if (comment.likes.includes(user.id)) {
            // removing the userid from comment likes array
            await Comment.findByIdAndUpdate(req.params.commentid, {
                $pull: {
                    likes: user.id
                }
            })
            // response
            res.status(200).json({ success: `You unliked the comment.` })
        }
        else {
            // adding userid to comment likes
            await Comment.findByIdAndUpdate(req.params.commentid, {
                $push: {
                    likes: user.id
                }
            })
            // response
            res.status(200).json({ success: `You liked the comment.` })
        }
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}