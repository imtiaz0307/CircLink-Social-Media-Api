import { Post } from "../../models/Post.js";

export const getPost = async (req, res) => {
    try {
        // finding post by id
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).send('No post found.')

        // response
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).send(error)
    }
}