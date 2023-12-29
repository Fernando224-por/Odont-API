import { prisma } from '../db.js'
import bcrypt from 'bcryptjs'
import { v4 as uuid4 } from 'uuid'

export const newUser = async (req, res) => {
  const { numDocument, name, phone, email, password } = req.body
  try {
    const identifier = uuid4()
    const hash = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        idUser: identifier,
        docUser: numDocument,
        nameUser: name,
        phoneUser: phone,
        emailUser: email,
        passwordUser: hash
      }
    })
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

export const updateUser = async (req, res) => {
  try {
    const test = String(req.params.id)
    const userFound = await prisma.user.findFirst({
      where: {
        idUser: test
      }
    })
    if (!userFound) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    const userUpdate = await prisma.user.update({
      where: {
        idUser: test
      },
      data: {
        nameUser: req.body.name,
        emailUser: req.body.email,
        phoneUser: req.body.phone
      }
    })
    res.json(userUpdate)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}
