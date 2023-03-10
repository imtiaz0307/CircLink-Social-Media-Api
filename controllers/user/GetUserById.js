import { User } from "../../models/User.js"

export const getUserById = async (req, res) => {
    try {
        // finding user by id
        const user = await User.findOne({ _id: req.params.id }).select('-password')
        if (!user) return res.status(404).json({ error: 'No user found.' })

        // response
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}