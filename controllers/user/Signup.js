import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { validationResult } from "express-validator";

// env config function
config()

// constants 
const JWT_SECRET = process.env.JWT_SECRET

// function
export const signup = async (req, res) => {
    // if something goes wrong during validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // signup logic
    try {
        // checking if the user with same username exists
        let user = await User.findOne({ userName: req.body.userName })
        if (user) return res.status(409).json({ error: 'Username Taken.' })

        // checking if the user with same email exists
        user = await User.findOne({ email: req.body.email })
        if (user) return res.status(409).json({ error: 'Email belongs to another account.' })

        // hashing salting password
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        // converting body string date to date
        req.body.dateOfBirth = new Date(req.body.dateOfBirth)

        // creating user
        user = await User.create(req.body)
        await user.save()

        // auth token
        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET)

        // response
        res.status(200).json({ token: authToken })
    } catch (error) {
        return res.status(500).json({ erorr: error })
    }
}