import { v4 as uuid4 } from 'uuid'
import { prisma } from '../db.js'

export const newDate = async (req, res) => {
  try {
    const { numDocument, numBook, timeDate } = req.body
    const user = await prisma.user.findUnique({
      where: {
        docUser: numDocument,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    const book = await prisma.book.findFirst({
      where: {
        idBook: numBook,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!user && !book) {
      return res.status(404).json({
        message: 'user or book not found'
      })
    }
    const identifier = uuid4()
    const date = await prisma.meeting.create({
      data: {
        idDate: identifier,
        idBook: numBook,
        idUser: numDocument,
        dateHour: timeDate
      }
    })
    res.json(date)
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
      fault: error
    })
  }
}
