import { User } from "../../models/User.js"

export const unfollowUser = async (req, res) => {
    if (req.params.id === req.user.id) return res.status(403).send("You can't unfollow yourself.")
    // logic
    try {
        // current user
        let currentUser = await User.findByIdAndUpdate(req.user.id, {
            $pull: { following: req.params.id }
        })

        // the user who is getting followed
        let followedUser = await User.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.user.id }
        })

        // response
        res.status(200).send(`${currentUser.userName} unfollowed ${followedUser.userName}.`)
    } catch (error) {
        return res.status(500).send(error)
    }
}