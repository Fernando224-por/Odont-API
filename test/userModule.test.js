/* eslint-disable no-undef */
import app from '../src/app.js'
import request from 'supertest'
import { registerNewUser, updateOneUser } from './helpersTest.js'

describe('test API user Route', () => {
  test('POST for "/newUser" route', async () => {
    const res = await request(app).post('/api/newUser').send(registerNewUser)
    console.log(res.body)
    expect(res.statusCode).toBe(200)
  })
  test('GET for "/allUsers" route', async () => {
    const res = await request(app).get('/api/allUsers').send()
    expect(res.body).toHaveLength(res.body.length)
    expect(res.statusCode).toBe(200)
  })
  test('GET for "/oneUser/:id" route', async () => {
    const res = await request(app).get('/api/oneUser/:id').send()
    expect(res.body.name).toEqual('<replace>')
    expect(res.body.email).toEqual('<replace>')
    expect(res.statusCode).toBe(200)
  })
  test('PUT for "/putUser/:id" route', async () => {
    const res = await request(app).put('/api/putUser/:id').send(updateOneUser)
    console.log(res.body)
    expect(res.statusCode).toBe(200)
  })
  test('Delete for "/deleteUser/:id" route', async () => {
    const res = await request(app).delete('/api/deleteUser/:id').send()
    expect(res.statusCode).toBe(200)
  })
})
