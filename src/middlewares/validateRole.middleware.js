import jwt from 'jsonwebtoken'

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

export const odontRequired = (req, res, next) => {
  try {
    const { token } = req.cookies
    const decodeToken = jwt.decode(token)
    const role = decodeToken.role
    if (role !== 'ODONTOLOGO') {
      return res.status(401).json({
        message: 'authorization denied!'
      })
    }
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
