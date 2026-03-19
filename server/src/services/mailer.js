const nodemailer = require('nodemailer')

function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

function formatEmail(data) {
  const services = Array.isArray(data.services) ? data.services.join(', ') : data.services
  const line = '━'.repeat(32)

  return {
    subject: `New Client Intake — ${data.company} (${services})`,
    text: `
${line}
NEW CLIENT INTAKE SUBMISSION
Red Stone Dev Studio
Submitted: ${new Date().toISOString()}
${line}

CONTACT
Name:    ${data.name}
Email:   ${data.email}
Company: ${data.company}
Phone:   ${data.phone || 'not provided'}

SERVICES REQUESTED
${services}

BUSINESS PROFILE
Industry:      ${data.industry}
Company size:  ${data.companySize}
Current tools: ${data.currentTools || 'not provided'}

THE PROBLEM
Pain point:
  ${data.painPoint}

Already tried:
  ${data.alreadyTried || 'not provided'}

PROJECT SCOPE
Budget:   ${data.budget}
Timeline: ${data.timeline}
Source:   ${data.source || 'not provided'}
${line}
`.trim()
  }
}

async function sendIntakeEmail(data) {
  const transport = createTransport()
  const { subject, text } = formatEmail(data)
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject,
    text
  })
}

module.exports = { sendIntakeEmail, formatEmail }
