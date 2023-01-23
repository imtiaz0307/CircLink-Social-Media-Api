import { User } from "../../models/User.js"
import { Post } from "../../models/Post.js"

export const userAndFriendsPosts = async (req, res) => {
    try {
        // finding current user by id
        const currentUser = await User.findById(req.user.id)

        // all posts in the database
        const allPosts = await Post.find()

        // filtering out user's posts
        const posts = allPosts.filter(post => post.user._id.toString() === currentUser.id)

        // filtering out user's following posts
        const followingPosts = currentUser.following.map(followedUser => {
            return allPosts.filter(post => post.user._id.toString() == followedUser._id)
        })

        // concating following posts array in userposts array and sending it as response
        res.json(posts.concat(...followingPosts))
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}