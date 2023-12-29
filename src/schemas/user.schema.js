import { z } from 'zod'

export const newUserSchema = z.object({
  numDocument: z.number({
    required_error: 'Number document are required'
  }).max(10, {
    message: 'must have 10 characters'
  }),
  name: z.string({
    required_error: 'Name is Required'
  }),
  phone: z.string({
    required_error: 'Phone is required'
  }).max(10, {
    message: 'must have 10 characters'
  }),
  email: z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Invalid email address'
  }).endsWith('.com', {
    message: 'Only .com domains allowed'
  }),
  password: z.string({
    required_error: 'Password is required'
  }).min(8, {
    message: 'Must be 8 or more characters long'
  })
})

export const loginUserSchema = z.object({
  email: z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Invalid email address'
  }).endsWith('.com', {
    message: 'Only .com domains allowed'
  }),
  password: z.string({
    required_error: 'Password is required'
  }).min(8, {
    message: 'Must be 8 or more characters long'
  })
})
