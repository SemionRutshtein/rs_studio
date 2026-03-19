const request = require('supertest')
const express = require('express')

// Mock mailer before requiring the route
jest.mock('../src/services/mailer', () => ({
  sendIntakeEmail: jest.fn().mockResolvedValue(undefined)
}))

const { sendIntakeEmail } = require('../src/services/mailer')
const intakeRouter = require('../src/routes/intake')

function buildApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/intake', intakeRouter)
  return app
}

const validPayload = {
  services: ['Agentic AI Automation'],
  industry: 'E-Commerce',
  companySize: '11–50',
  painPoint: 'We spend 20hrs/week on manual order handling',
  budget: '$5,000 – $15,000',
  timeline: '1–3 months',
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Store'
}

describe('POST /api/intake', () => {
  beforeEach(() => jest.clearAllMocks())

  test('returns 200 and calls sendIntakeEmail with valid payload', async () => {
    const res = await request(buildApp()).post('/api/intake').send(validPayload)
    expect(res.status).toBe(200)
    expect(sendIntakeEmail).toHaveBeenCalledWith(expect.objectContaining({ name: 'John Doe' }))
  })

  test('returns 400 when services is empty', async () => {
    const res = await request(buildApp()).post('/api/intake').send({ ...validPayload, services: [] })
    expect(res.status).toBe(400)
    expect(sendIntakeEmail).not.toHaveBeenCalled()
  })

  test('returns 400 when required field is missing', async () => {
    const { name, ...payload } = validPayload
    const res = await request(buildApp()).post('/api/intake').send(payload)
    expect(res.status).toBe(400)
  })

  test('returns 500 when mailer throws', async () => {
    sendIntakeEmail.mockRejectedValueOnce(new Error('SMTP error'))
    const res = await request(buildApp()).post('/api/intake').send(validPayload)
    expect(res.status).toBe(500)
    expect(res.body).toMatchObject({ error: expect.any(String) })
  })
})
