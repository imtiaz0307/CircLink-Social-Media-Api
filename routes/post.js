import { Router } from 'express'
import { createComment } from '../controllers/comment/CreateComment.js'
import { createPost } from '../controllers/post/CreatePost.js'
import { deletePost } from '../controllers/post/DeletePost.js'
import { editPost } from '../controllers/post/EditPost.js'
import { getPost } from '../controllers/post/GetPost.js'
import { likeUnlikePost } from '../controllers/post/LikeUnlikePost.js'
import { verifyUser } from '../middlewares/verifyUser.js'
import { body } from 'express-validator'
import { getComment } from '../controllers/comment/GetComment.js'
import { editComment } from '../controllers/comment/EditComment.js'
import { deleteComment } from '../controllers/comment/DeleteComment.js'
import { likeUnlikeComment } from '../controllers/comment/LikeUnlikeComment.js'
import { publicPosts } from '../controllers/post/PublicFeed.js'
import { userAndFriendsPosts } from '../controllers/post/UserAndFriendsPosts.js'

// constants
const router = Router()

// routes
// get post
router.get('/:id', getPost)

// create posts
router.post('/create', verifyUser, createPost)

// edit post
router.put('/:id/edit', verifyUser, editPost)

// delete post
router.delete('/:id/delete', verifyUser, deletePost)

// like post
router.put('/:id/react', verifyUser, likeUnlikePost)


// comments routes
// get comment
router.get('/:postid/comments/:commentid', getComment)

// create comment
router.post('/:postid/comments/create',
    [
        body('content', 'Message must be atleast 1 character.').isLength(1)
    ]
    , verifyUser, createComment
)

// edit comment
router.put('/:postid/comments/:commentid/edit', verifyUser, editComment)

// delete comment
router.delete('/:postid/comments/:commentid/delete', verifyUser, deleteComment)

// like/unlike comment
router.put('/:postid/comments/:commentid/react', verifyUser, likeUnlikeComment)

// public feed 
router.get('/public/explore', verifyUser, publicPosts)

// user timeline
router.get('/', verifyUser, userAndFriendsPosts)

export default router