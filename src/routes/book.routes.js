import { Router } from 'express'
import { newBookSchema } from '../schemas/book.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { authRequired, adminRequired } from '../middlewares/validateToken.middleware.js'
import { newBook, getAllBooks, getOneBook } from '../controllers/book.controller.js'
const router = Router()

router.post('/newBook', authRequired, adminRequired, validateSchema(newBookSchema), newBook)
router.get('/allBooks', authRequired, adminRequired, getAllBooks)
router.get('/oneBook/:id', authRequired, getOneBook)

export default router
