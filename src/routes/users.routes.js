import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { newUserSchema } from '../schemas/user.schema.js'
import { newUser } from '../controllers/user.controller.js'
const router = Router()

router.post('/newUser', validateSchema(newUserSchema), newUser)

export default router
