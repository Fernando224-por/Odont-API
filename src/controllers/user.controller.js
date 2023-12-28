import { prisma } from '../db.js'
import bcrypt from 'bcryptjs'
import { v4 as uuid4 } from 'uuid'

export const newUser = async (req, res) => {
  try {
    const identifier = uuid4()
    const { numDocument, name, phone, email, password } = req.body
    const hash = await bcrypt.hash(password, 16)
    const newUser = await prisma.user.create({
      data: {
        idUser: identifier,
        nameUser: name,
        docUser: numDocument,
        phoneUser: phone,
        emailUser: email,
        passwordUser: hash
      }
    })
    console.log(newUser)
    res.json(newUser)
  } catch (err) {
    console.log(err)
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
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}

export const getOneUser = async (req, res) => {
  try {
    const identifier = String(req.params.id)
    const user = await prisma.user.findUnique({
      where: {
        idUser: identifier
      }
    })
    res.json({
      name: user.nameUser,
      email: user.emailUser
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const identifier = String(req.params.id)
    const oldUser = await prisma.user.delete({
      where: {
        idUser: identifier
      }
    })
    console.log(oldUser)
    res.json({
      name: oldUser.nameUser,
      email: oldUser.emailUser,
      phone: oldUser.phoneUser
    })
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}
