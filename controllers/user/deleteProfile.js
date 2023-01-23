import { User } from "../../models/User.js";

export const deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id)

        // response
        res.status(200).json({ success: "Account deleted successfully." })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }

}