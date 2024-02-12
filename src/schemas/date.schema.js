import { z } from 'zod'

export const newDateSchema = z.object({
  numDocument: z.number({
    required_error: 'Number document are required'
  }).min(10, {
    message: 'must have 10 characters'
  }),
  numBook: z.number({
    required_error: 'NumBook are required'
  }),
  timeDate: z.string({
    required_error: 'Time is required'
  })
})
