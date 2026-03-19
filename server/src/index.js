const express = require('express')
const cors = require('cors')
const intakeRouter = require('./routes/intake')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/intake', intakeRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
