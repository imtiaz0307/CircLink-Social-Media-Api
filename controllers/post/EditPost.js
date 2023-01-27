import { Post } from '../../models/Post.js'
import { User } from '../../models/User.js';

export const editPost = async (req, res) => {
    const { caption, file } = req.body;
    try {
        // finding user by id
        const user = await User.findById(req.user.id)

        // finding post by id
        const post = await Post.findById(req.params.id)

        // if the current user doesn't own the post
        if (post.userid.toString() !== user.id) return res.status(403).json({ error: 'Access denied.' })

        // finding post by id and updating it
        await Post.findByIdAndUpdate(post.id, {
            $set: {
                caption,
                file
            }
        })

        // response
        res.status(200).json({ success: 'Post updated successfully.' })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}