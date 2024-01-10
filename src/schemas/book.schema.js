import { z } from 'zod'

export const newBookSchema = z.object({
  doctorDoc: z.number({
    required_error: 'Doctor Document are required'
  }).min(10, {
    message: 'Remember, must be have 10 numbers'
  }),
  startMonthBook: z.string({
    required_error: 'Start month are required'
  }).min(4, {
    message: 'Remember, must be have 4 characters'
  }).max(18, {
    message: 'Remember, could not have more than 18 characters'
  }),
  endMonthBook: z.string({
    required_error: 'End Month are required'
  }).min(4, {
    message: 'Remember, must be have 4 characters'
  }).max(18, {
    message: 'Remember, could not have more than 18 characters'
  }),
  yearBook: z.number({
    required_error: 'Year field is required'
  }).min(4, {
    message: 'Remember, must be have 4 numbers'
  })
})
