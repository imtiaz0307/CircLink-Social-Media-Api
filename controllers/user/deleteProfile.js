import { User } from "../../models/User.js";

export const deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id)

        // response
        res.status(200).send("Account deleted successfully.")
    } catch (error) {
        return res.status(500).send(error)
    }

}