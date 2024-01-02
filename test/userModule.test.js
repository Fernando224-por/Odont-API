/* eslint-disable no-undef */
import app from '../src/app.js'
import request from 'supertest'
import { updateOneUser } from './helpersTest.js'

describe('test API user Route', () => {
  test('GET for "/allUsers" route', async () => {
    const res = await request(app).get('/api/allUsers').send()
    expect(res.body).toHaveLength(res.body.length)
    expect(res.statusCode).toBe(200)
  })
  test('GET for "/oneUser/:id" route', async () => {
    const res = await request(app).get('/api/oneUser/41e1dc81-25d1-45a4-acce-3d7896d579a9').send()
    expect(res.body.name).toEqual('Ricardo')
    expect(res.body.email).toEqual('felipao6578@gmail.com')
    expect(res.statusCode).toBe(200)
  })
  test('PUT for "/putUser/:id" route', async () => {
    const res = await request(app).put('/api/putUser/ceddf7c0-5157-4c39-8901-1ded88a1443a').send(updateOneUser)
    console.log(res.body)
    expect(res.statusCode).toBe(200)
  })
})
