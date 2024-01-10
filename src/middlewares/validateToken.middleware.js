import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config.js'

export const authRequired = (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).json({
        message: 'No token, authorization denied'
      })
    }
    jwt.verify(token, JWT_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({
          message: 'Token is not valid'
        })
      }
      req.user = user
      next()
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const adminRequired = (req, res, next) => {
  try {
    const { token } = req.cookies
    const decodeToken = jwt.decode(token)
    const role = decodeToken.role
    if (role !== 'ADMINISTRADOR') {
      return res.status(401).json({
        message: 'authorization denied!'
      })
    }
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
