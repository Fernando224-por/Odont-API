import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { authRequired } from '../middlewares/validateToken.middleware.js'
import { newUserSchema } from '../schemas/user.schema.js'
import { newUser, getAllUsers, getOneUser, deleteUser, updateUser } from '../controllers/user.controller.js'
const router = Router()

router.post('/newUser', validateSchema(newUserSchema), authRequired, newUser)
router.get('/allUsers', authRequired, getAllUsers)
router.get('/oneUser/:id', authRequired, getOneUser)
router.delete('/deleteUser/:id', authRequired, deleteUser)
router.put('/putUser/:id', authRequired, updateUser)

export default router
