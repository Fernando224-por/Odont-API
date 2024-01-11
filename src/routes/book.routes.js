import { Router } from 'express'
import { newBookSchema } from '../schemas/book.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { authRequired } from '../middlewares/validateToken.middleware.js'
import { adminRequired, odontRequired } from '../middlewares/validateRole.middleware.js'
import { newBook, getAllBooks, getOneBook, getDoctorBooks, deleteBook, updateBook } from '../controllers/book.controller.js'
const router = Router()

router.post('/newBook', authRequired, adminRequired, validateSchema(newBookSchema), newBook)
router.get('/allBooks', authRequired, adminRequired, getAllBooks)
router.get('/doctorBook', authRequired, odontRequired, getDoctorBooks)
router.get('/oneBook/:id', authRequired, getOneBook)
router.put('/updateBook', authRequired, updateBook)
router.delete('/deleteBook', authRequired, adminRequired, deleteBook)

export default router
