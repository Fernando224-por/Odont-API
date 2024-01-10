import { prisma } from '../db.js'

export const newBook = async (req, res) => {
  try {
    const { doctorDoc, startMonthBook, endMonthBook, yearBook } = req.body
    const user = await prisma.user.findUnique({
      where: {
        docUser: doctorDoc,
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
        dentistId: doctorDoc,
        startMonth: startMonthBook,
        endMonth: endMonthBook,
        year: yearBook
      }
    })
    res.json(book)
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}

export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany()
    res.json(books)
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const getOneBook = async (req, res) => {
  try {
    const identifier = Number(req.params.id)
    const book = await prisma.book.findUnique({
      where: {
        idBook: identifier
      }
    })
    res.json(book)
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}
