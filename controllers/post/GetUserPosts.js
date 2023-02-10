import { Post } from "../../models/Post.js";

export const getUserPosts = async (req, res) => {
    try {
        // finding post by id
        let posts = await Post.find()

        // filtering out user's posts
        posts = posts.filter(post => post.userid.toString() == req.params.userid)
        if (!posts) return res.status(404).json({ error: 'No post found.' })

        // response
        res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}