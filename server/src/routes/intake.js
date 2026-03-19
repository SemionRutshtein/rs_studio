const { Router } = require('express')
const { validateIntake } = require('../middleware/validate')
const { sendIntakeEmail } = require('../services/mailer')

const router = Router()

router.post('/', validateIntake, async (req, res) => {
  try {
    await sendIntakeEmail(req.body)
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Mailer error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

module.exports = router
