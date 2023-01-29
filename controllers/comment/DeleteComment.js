import { Comment } from '../../models/Comment.js'
import { User } from '../../models/User.js';
import { Post } from '../../models/Post.js';

export const deleteComment = async (req, res) => {
    try {
        // finding user by id
        const user = await User.findById(req.user.id)

        // finding comment by id
        const comment = await Comment.findById(req.params.commentid)

        // if the current user doesn't own the comment
        if (comment.userid.toString() !== user.id) return res.status(403).json({ error: 'Access denied.' })

        // finding comment by id and delete it
        await Comment.findByIdAndDelete(comment.id)

        // finding post and removing comment from it
        await Post.findByIdAndUpdate(req.params.postid, {
            $pull: {
                comments: req.params.commentid
            }
        })

        // response
        res.status(200).json({ success: 'Comment deleted successfully.' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ erorr: error })
    }
}