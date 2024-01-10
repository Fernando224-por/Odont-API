import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { authRequired, adminRequired } from '../middlewares/validateToken.middleware.js'
import { newUserSchema } from '../schemas/user.schema.js'
import { newUser, getAllUsers, getOneUser, deleteUser, updateUser } from '../controllers/user.controller.js'
const router = Router()

router.post('/newUser', validateSchema(newUserSchema), newUser)
router.get('/allUsers', authRequired, adminRequired, getAllUsers)
router.get('/oneUser/:id', authRequired, getOneUser)
router.delete('/deleteUser/:id', authRequired, deleteUser)
router.put('/putUser/:id', authRequired, updateUser)

export default router
