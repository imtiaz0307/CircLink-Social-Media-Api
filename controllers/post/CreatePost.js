import { Post } from "../../models/Post.js";

export const createPost = async (req, res) => {
    const { caption, file } = req.body;
    // logic
    if (!caption && !file) return res.status(400).json({ error: "Post can't be empty." })
    try {
        // creating post
        const post = await Post.create({
            userid: req.user.id,
            caption,
            file
        })
        // saving post
        post.save()

        // response
        res.status(200).json({ success: 'Post created successfully.', post })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}