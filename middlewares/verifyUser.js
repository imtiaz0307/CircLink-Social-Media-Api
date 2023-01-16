import jwt from "jsonwebtoken";
import { config } from "dotenv";

// dotenv config
config()

// constants 
const JWT_SECRET = process.env.JWT_SECRET

export const verifyUser = (req, res, next) => {
    try {
        // data from token verification
        const data = jwt.verify(req.header('auth-token'), JWT_SECRET)
        if (!data) return res.status(403).send('Access denied.')
        // assigning data user to request user
        req.user = data.user
        // calling next function
        next()
    } catch (error) {
        return res.status(500).send(error)
    }
}