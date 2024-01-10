import { Router } from 'express'
import { newBook } from '../controllers/book.controller.js'
const router = Router()

router.post('/newBook', newBook)

export default router
