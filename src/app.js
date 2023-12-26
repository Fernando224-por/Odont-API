import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { FRONT_URL } from './config.js'
import userRoutes from './routes/users.routes.js'

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
  origin: FRONT_URL,
  methods: 'GET,PATCH,PUT,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true
}))
app.use(cookieParser())

app.use('/api', userRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

export default app
