import { User } from "../../models/User.js"
import bcrypt from 'bcryptjs'


export const editProfile = async (req, res) => {
    try {
        // if user wants to change the password
        if (req.body.password) {
            // genersting salt and hashing password
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        // finding user by id and updating
        await User.findByIdAndUpdate(req.user.id, {
            $set: req.body
        })

        // response
        res.status(200).json({ success: 'Account updated successfully.' })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}