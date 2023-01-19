import { Post } from "../../models/Post.js"

export const publicPosts = async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
}