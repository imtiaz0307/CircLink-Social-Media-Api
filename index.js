import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import userRouter from './routes/user.js'
import postRouter from './routes/post.js'

// function calls
config()
mongoose.set('strictQuery', 'true')

// constants
const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

// mongodb connection
mongoose.connect(MONGO_URI, () => console.log('Database Connected.'))

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/auth', userRouter)
app.use('/post', postRouter)

// app connection
app.listen(PORT, () => console.log('Server running.'))