import { prisma } from '../db.js'
import bcrypt from 'bcryptjs'

export const newUser = async (req, res) => {
  try {
    const { numDocument, name, phone, email, password } = req.body
    const hash = await bcrypt.hash(password, 16)
    const newUser = await prisma.user.create({
      data: {
        idUser: numDocument,
        nameUser: name,
        phoneUser: phone,
        emailUser: email,
        passwordUser: hash
      }
    })
    console.log(newUser)
    res.json(newUser)
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    console.log(users)
    res.json(users)
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}
