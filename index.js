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

// setting view 
app.set('view engine', 'ejs')

// middlewares
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// routes
app.get('/', (_, res) => {
    res.render('index')
})
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)

// app connection
app.listen(PORT, () => console.log('Server running.'))