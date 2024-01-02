/* eslint-disable no-undef */
import app from '../src/app.js'
import request from 'supertest'
import { testUser } from './helpersTest.js'

describe('test for undefined routes && protected routes', () => {
  test('should be response with a 404 status code', async () => {
    const res = await request(app).get('/').send()
    expect(res.body.message).toEqual('Route not found')
    expect(res.statusCode).toBe(404)
  })
  test('Should be response with a 400 status code', async () => {
    const res = await request(app).get('/api/authRequired').send()
    expect(res.body.message).toEqual('No token, authorization denied')
    expect(res.statusCode).toBe(401)
  })
})

describe('Test login route', () => {
  test('Sould be response with 200 status code, response json object', async () => {
    const res = await request(app).post('/api/login').send(testUser)
    expect(res.statusCode).toBe(200)
  })
})
