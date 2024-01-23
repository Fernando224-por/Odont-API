import { prisma } from '../db.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config.js'

export const logIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        emailUser: email,
        AND: {
          state: 'ACTIVE'
        }
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
      numDoc: userFound.docUser
    })
    res.cookie('token', token)
    res.json({
      username: userFound.nameUser,
      role: userFound.role,
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

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  jwt.verify(token, JWT_KEY, async (error, user) => {
    if (error) return res.status(401).json({ message: 'Unauthorized' })

    const userFound = await prisma.user.findFirst({
      where: {
        idUser: user.id
      }
    })
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' })

    return res.json({
      id: userFound.idUser,
      name: userFound.nameUser
    })
  })
}
