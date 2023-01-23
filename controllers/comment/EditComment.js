import { Comment } from '../../models/Comment.js'
import { User } from '../../models/User.js';

export const editComment = async (req, res) => {
    const { content } = req.body;
    try {
        // finding user by id
        const user = await User.findById(req.user.id)

        // finding comment by id
        const comment = await Comment.findById(req.params.commentid)

        // if the current user doesn't own the comment
        if (comment.user._id.toString() !== user.id) return res.status(403).json({ error: 'Access denied.' })

        // finding comment by id and updating it
        await Comment.findByIdAndUpdate(comment.id, {
            $set: {
                content
            }
        })

        // response
        res.status(200).json({ success: 'Comment updated successfully.' })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}