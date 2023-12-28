import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { newUserSchema } from '../schemas/user.schema.js'
import { newUser, getAllUsers, getOneUser, deleteUser, updateUser } from '../controllers/user.controller.js'
const router = Router()

router.post('/newUser', validateSchema(newUserSchema), newUser)
router.get('/allUsers', getAllUsers)
router.get('/oneUser/:id', getOneUser)
router.delete('/deleteUser/:id', deleteUser)
router.put('/putUser/:id', updateUser)

export default router
