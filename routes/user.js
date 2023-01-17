import { Router } from "express";
import { body } from "express-validator";
import { deleteProfile } from "../controllers/user/deleteProfile.js";
import { editProfile } from "../controllers/user/EditProfile.js";
import { followUser } from "../controllers/user/FollowUser.js";
import { getCurrentUser } from "../controllers/user/GetCurrent.js";
import { getUser } from "../controllers/user/GetUser.js";
import { login } from "../controllers/user/Login.js";
import { signup } from "../controllers/user/Signup.js";
import { unfollowUser } from "../controllers/user/UnfollowUser.js";
import { verifyUser } from "../middlewares/verifyUser.js";

// constants
const router = Router()

// routes
// signup
router.post(
    '/signup',
    // validation
    [
        body('name', 'Name must be at least 6 characters.').isLength(6),
        body('userName', 'Username must be at least 4 characters.').isLength(4),
        body('email', 'Invalid Email Format.').isEmail(),
        body('password', 'Password must be at least 8 characters.').isLength(8),
    ]
    , signup
)

// login
router.post('/login', login)

// get current user
router.get('/getcurrent', verifyUser, getCurrentUser)

// get user
router.get('/getuser/:id', getUser)

// edit profile
router.put('/edit', verifyUser, editProfile)

// delete profile
router.delete('/delete', verifyUser, deleteProfile)

// follow a user 
router.put('/follow/:id', verifyUser, followUser)

// unfollow a user 
router.put('/unfollow/:id', verifyUser, unfollowUser)


export default router;