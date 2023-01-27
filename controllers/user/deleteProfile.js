import { User } from "../../models/User.js";
import { Post } from "../../models/Post.js";

export const deleteProfile = async (req, res) => {
    try {
        // finding user by id and delete
        const user = await User.findByIdAndDelete(req.user.id)

        // finding user's posts and deleting them
        let posts = await Post.find()

        posts = posts.filter(post => post.user.userName === user.userName)
            .map(async (post) => await Post.findByIdAndDelete(post.id))

        // response
        res.status(200).json({ success: "Account deleted successfully." })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }

}