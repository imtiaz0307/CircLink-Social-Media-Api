import { User } from "../../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

// env config function
config()

// constants 
const JWT_SECRET = process.env.JWT_SECRET

// login function
export const login = async (req, res) => {
    // if user tries to login with username
    if (req.body.userName) {
        try {
            // finding user by username
            let user = await User.findOne({ userName: req.body.userName })
            if (!user) return res.status(404).send('Invalid Credentials.')

            // comparing password
            req.body.password = await bcrypt.compare(req.body.password, user.password)
            if (!req.body.password) return res.status(404).send('Invalid Credentials.')

            // auth token
            const payload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(payload, JWT_SECRET)

            // response
            res.status(201).json({ token: authToken })
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    // if user tries to login with email
    if (req.body.email) {
        try {
            // finding user by username
            let user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(404).send('Invalid Credentials.')

            // comparing password
            req.body.password = await bcrypt.compare(req.body.password, user.password)
            if (!req.body.password) return res.status(404).send('Invalid Credentials.')

            // auth token
            const payload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(payload, JWT_SECRET)

            // response
            res.status(201).json({ token: authToken })
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}