import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { authRequired } from '../middlewares/validateToken.middleware.js'
import { loginUserSchema } from '../schemas/user.schema.js'
import { logIn, protectedRoute, logOut } from '../controllers/auth.controller.js'
const router = Router()

router.post('/login', validateSchema(loginUserSchema), logIn)
router.post('/logOut', authRequired, logOut)
router.get('/authRequired', authRequired, protectedRoute)

export default router
