import { Comment } from "../../models/Comment.js";

export const getComment = async (req, res) => {
    try {
        // finding comment
        const comment = await Comment.findOne({
            _id: req.params.commentid
        })
        if (!comment) return res.status(404).json({ error: 'No comment found.' })

        // response
        res.status(200).json(comment)
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}