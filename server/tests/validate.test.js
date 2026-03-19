const { validateIntake } = require('../src/middleware/validate')

function mockRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

const validBody = {
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

describe('validateIntake', () => {
  test('passes with all required fields', () => {
    const req = { body: { ...validBody } }
    const res = mockRes()
    const next = jest.fn()
    validateIntake(req, res, next)
    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
  })

  test('rejects when services is empty array', () => {
    const req = { body: { ...validBody, services: [] } }
    const res = mockRes()
    validateIntake(req, res, jest.fn())
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }))
  })

  test('rejects when required string field is missing', () => {
    const { name, ...bodyWithoutName } = validBody
    const req = { body: bodyWithoutName }
    const res = mockRes()
    validateIntake(req, res, jest.fn())
    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('rejects invalid email format', () => {
    const req = { body: { ...validBody, email: 'not-an-email' } }
    const res = mockRes()
    validateIntake(req, res, jest.fn())
    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('accepts optional fields as missing', () => {
    const req = { body: { ...validBody } }
    const res = mockRes()
    const next = jest.fn()
    validateIntake(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
