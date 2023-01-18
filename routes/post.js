import { Router } from 'express'
import { createPost } from '../controllers/post/CreatePost.js'
import { deletePost } from '../controllers/post/DeletePost.js'
import { editPost } from '../controllers/post/EditPost.js'
import { getPost } from '../controllers/post/GetPost.js'
import { likeUnlikePost } from '../controllers/post/LikeUnlikePost.js'
import { verifyUser } from '../middlewares/verifyUser.js'

// constants
const router = Router()

// routes
// get post
router.get('/:id', getPost)

// create posts
router.post('/create', verifyUser, createPost)

// edit post
router.put('/edit/:id', verifyUser, editPost)

// delete post
router.delete('/delete/:id', verifyUser, deletePost)

// like post
router.put('/react/:id', verifyUser, likeUnlikePost)

export default router