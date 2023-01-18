import { Comment } from "../../models/Comment.js";

export const getComment = async (req, res) => {
    try {
        // finding comment
        const comment = await Comment.findOne({
            id: req.params.commentid,
            postid: req.params.postid
        })
        if (!comment) return res.status(404).send('No comment found.')

        // response
        res.status(200).json(comment)
    } catch (error) {
        return res.status(500).send(error)
    }
}