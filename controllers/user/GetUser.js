import { User } from "../../models/User.js"

export const getUser = async (req, res) => {
    try {
        // finding user by id
        const user = await User.findOne({ userName: req.params.username }).select('-password')
        if (!user) return res.status(404).json({ error: 'No user found.' })

        // response
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}