import { User } from "../../models/User.js"


export const getCurrentUser = async (req, res) => {
    try {
        // finding user by userid
        let user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(404).send('No user found.')

        // response
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}