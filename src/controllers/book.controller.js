import { prisma } from '../db.js'

export const newBook = async (req, res) => {
  try {
    const { doctorAssignement } = req.body
    const user = await prisma.user.findUnique({
      where: {
        docUser: doctorAssignement,
        AND: {
          role: 'ODONTOLOGO',
          state: 'ACTIVE'
        }
      }
    })
    if (!user) {
      return res.status(404).json({
        message: 'user not found'
      })
    }
    const book = await prisma.book.create({
      data: {
        dentistId: doctorAssignement
      }
    })
    res.json(book)
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}
