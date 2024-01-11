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

export const getDoctorBooks = async (req, res) => {
  try {
    const odontBook = await prisma.book.findMany({
      where: {
        dentistId: req.user.numDoc
      }
    })
    if (!odontBook) {
      return res.status(404).json({
        message: 'User not Found'
      })
    }
    if (odontBook.length === 0) {
      return res.status(404).json({
        message: 'This Dentist dont have Books yet'
      })
    }
    res.json(odontBook)
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

export const deleteBook = async (req, res) => {
  try {
    const { book } = req.body
    const oldBook = await prisma.book.update({
      where: {
        idBook: book
      },
      data: {
        state: 'INACTIVE'
      }
    })
    res.json(oldBook)
  } catch (error) {
    return res.status(500).json({
      message: 'someting goes wrong'
    })
  }
}

export const updateBook = async (req, res) => {
  try {
    const { book, doctorAssigment } = req.body
    const dataUpdate = await prisma.book.update({
      where: {
        idBook: book,
        AND: {
          state: 'ACTIVE'
        }
      },
      data: {
        dentistId: doctorAssigment
      }
    })
    res.json(dataUpdate)
  } catch (error) {
    return res.status(500).json({
      message: 'someting goes wrong'
    })
  }
}
