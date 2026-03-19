const REQUIRED_STRINGS = ['industry', 'companySize', 'painPoint', 'budget', 'timeline', 'name', 'email', 'company']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateIntake(req, res, next) {
  const body = req.body

  if (!Array.isArray(body.services) || body.services.length === 0) {
    return res.status(400).json({ error: 'services must be a non-empty array' })
  }

  if (!body.services.every(s => typeof s === 'string' && s.trim().length > 0)) {
    return res.status(400).json({ error: 'each service must be a non-empty string' })
  }

  for (const field of REQUIRED_STRINGS) {
    if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
      return res.status(400).json({ error: `${field} is required` })
    }
  }

  if (!EMAIL_RE.test(body.email)) {
    return res.status(400).json({ error: 'email must be a valid email address' })
  }

  next()
}

module.exports = { validateIntake }
