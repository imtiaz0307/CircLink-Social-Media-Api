import { User } from "../../models/User.js"

export const followUser = async (req, res) => {
    if (req.params.id === req.user.id) return res.status(403).send("You can't follow yourself.")
    // logic
    try {
        // current user
        let currentUser = await User.findById(req.user.id).select('name userName profilePicture')
        // the user who is getting followed
        let followedUser = await User.findById(req.params.id).select('name userName profilePicture')

        // pushing followed user object in current user following
        await User.findByIdAndUpdate(currentUser.id, {
            $push: { following: followedUser }
        })

        // pushing current user object in followed user followers 
        await User.findByIdAndUpdate(followedUser.id, {
            $push: { followers: currentUser }
        })

        // response
        res.status(200).send(`${currentUser.userName} started following ${followedUser.userName}.`)
    } catch (error) {
        return res.status(500).send(error)
    }
}