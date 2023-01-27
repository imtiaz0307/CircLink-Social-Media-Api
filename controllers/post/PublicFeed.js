import { Post } from "../../models/Post.js"

export const publicPosts = async (req, res) => {
    try {
        // getting all posts 
        let posts = await Post.find()

        // filtering out the current user's posts.
        posts = posts.filter(post => {
            return post.userid.toString() !== req.user.id
        })

        // response
        res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}