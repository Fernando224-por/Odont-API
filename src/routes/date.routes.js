import { Router } from 'express'
import { newDateSchema } from '../schemas/date.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { authRequired } from '../middlewares/validateToken.middleware.js'
import { newDate } from '../controllers/date.controller.js'

const router = Router()

router.post('/newDate', authRequired, validateSchema(newDateSchema), newDate)

export default router
