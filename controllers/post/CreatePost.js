import { Post } from "../../models/Post.js";
import { User } from '../../models/User.js'

export const createPost = async (req, res) => {
    const { caption, file } = req.body;
    // logic
    if (!caption && !file) return res.status(400).send("Post can't be empty.")
    try {
        // finding user by id
        const user = await User.findById(req.user.id).select('name userName profilePicture')
        // creating post

        const post = await Post.create({
            user,
            caption,
            file
        })
        // saving post
        post.save()

        // response
        res.status(200).send('Post created successfully.')
    } catch (error) {
        return res.status(500).send(error)
    }
}