import { User } from "../../models/User.js";
import { Post } from "../../models/Post.js";

export const likeUnlikePost = async (req, res) => {
    try {
        // finding user by id
        const user = await User.findById(req.user.id)

        // checking if post exists
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).send('No post found.')

        // if user has already like the post
        if (post.likes.includes(user.id)) {
            // removing the userid from post likes array
            await Post.findByIdAndUpdate(req.params.id, {
                $pull: {
                    likes: user.id
                }
            })
            // response
            res.status(200).send(`You unliked ${post.user.name}'s post.`)
        }
        else {
            // adding userid to post likes
            await Post.findByIdAndUpdate(req.params.id, {
                $push: {
                    likes: user.id
                }
            })
            // response
            res.status(200).send(`You liked ${post.user.name}'s post.`)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}