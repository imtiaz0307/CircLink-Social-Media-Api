import { Comment } from '../../models/Comment.js'
import { User } from '../../models/User.js';

export const deleteComment = async (req, res) => {
    try {
        // finding user by id
        const user = await User.findById(req.user.id)

        // finding comment by id
        const comment = await Comment.findById(req.params.commentid)

        // if the current user doesn't own the comment
        if (comment.user._id.toString() !== user.id) return res.status(403).send('Access denied.')

        // finding comment by id and delete it
        await Comment.findByIdAndDelete(comment.id)

        // response
        res.status(200).send('Comment deleted successfully.')
    } catch (error) {
        return res.status(500).send(error)
    }
}