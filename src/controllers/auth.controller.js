import { prisma } from '../db.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const logIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        emailUser: email
      }
    })
    if (!userFound) {
      return res.status(400).json({
        message: 'Invalid credentials'
      })
    }
    const isMatch = await bcrypt.compare(password, userFound.passwordUser)
    if (!isMatch) {
      return res.status(400).json({
        message: 'invalid credentials'
      })
    }
    const token = await createAccessToken({
      id: userFound.idUser,
      name: userFound.nameUser,
      phone: userFound.phoneUser
    })
    res.cookie('token', token)
    res.json({
      username: userFound.nameUser,
      phone: userFound.phoneUser
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const logOut = async (req, res) => {
  res.clearCookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const protectedRoute = async (req, res) => {
  try {
    res.json({
      message: 'hola'
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Something goes wrong'
    })
  }
}
