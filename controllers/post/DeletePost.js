import { Post } from '../../models/Post.js'
import { User } from '../../models/User.js';

export const deletePost = async (req, res) => {
    try {
        // finding user by id
        const user = await User.findById(req.user.id)

        // finding post by id
        const post = await Post.findById(req.params.id)

        // if the current user doesn't own the post
        if (post.user._id.toString() !== user.id) return res.status(403).json({ error: 'Access denied.' })

        // finding post by id and delete it
        await Post.findByIdAndDelete(post.id)

        // response
        res.status(200).json({ success: 'Post deleted successfully.' })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}