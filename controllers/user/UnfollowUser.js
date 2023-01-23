import { User } from "../../models/User.js"

export const unfollowUser = async (req, res) => {
    if (req.params.id === req.user.id) return res.status(403).json({ error: "You can't unfollow yourself." })
    // logic
    try {
        // current user
        let currentUser = await User.findById(req.user.id).select('name userName profilePicture')
        // the user who is getting followed
        let followedUser = await User.findById(req.params.id).select('name userName profilePicture')

        // pulling followed user object in current user following
        await User.findByIdAndUpdate(currentUser.id, {
            $pull: { following: followedUser }
        })

        // pulling current user object in followed user followers 
        await User.findByIdAndUpdate(followedUser.id, {
            $pull: { followers: currentUser }
        })

        // response
        res.status(200).json({ success: `${currentUser.userName} unfollowed ${followedUser.userName}.` })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}