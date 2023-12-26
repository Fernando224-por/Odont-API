import { pool } from '../db.js'
import bcrypt from 'bcryptjs'

export const newUser = async (req, res) => {
  try {
    const { numDocument, name, phone, email, password } = req.body
    const hash = await bcrypt.hash(password, 16)
    const [[result]] = await pool.query('INSERT into userApp (idUser, nameUser, phoneUser, emailUser, passwordUser) values (?,?,?,?,?)', [numDocument, name, phone, email, hash])
    res.json(result)
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}
