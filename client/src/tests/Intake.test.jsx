import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import Intake from '../pages/Intake'

// Mock fetch
global.fetch = vi.fn()

function renderIntake() {
  return render(<MemoryRouter><Intake /></MemoryRouter>)
}

describe('Intake form', () => {
  beforeEach(() => vi.clearAllMocks())

  test('renders Step 1 on load', () => {
    renderIntake()
    expect(screen.getByText(/what do you need help with/i)).toBeInTheDocument()
  })

  test('Next button disabled until at least one service selected', () => {
    renderIntake()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  test('advances to Step 2 after selecting a service', async () => {
    renderIntake()
    await userEvent.click(screen.getByText('Agentic AI Automation'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/tell us about your business/i)).toBeInTheDocument()
  })

  test('Back button returns to previous step with state preserved', async () => {
    renderIntake()
    await userEvent.click(screen.getByText('Agentic AI Automation'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.click(screen.getByRole('button', { name: /back/i }))
    // Service card should still appear selected
    expect(screen.getByText('Agentic AI Automation').closest('[data-selected]')).toBeTruthy()
  })

  test('shows validation error on Step 5 when email is invalid', async () => {
    renderIntake()
    // Step 1
    await userEvent.click(screen.getByText('Web Development'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 2
    await userEvent.selectOptions(screen.getByLabelText(/industry/i), 'E-Commerce')
    await userEvent.click(screen.getByLabelText('11–50'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 3
    await userEvent.type(screen.getByLabelText(/pain point/i), 'Too much manual work')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 4
    await userEvent.click(screen.getByLabelText(/\$5,000/i))
    await userEvent.click(screen.getByLabelText(/1–3 months/i))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 5
    await userEvent.type(screen.getByLabelText(/full name/i), 'John')
    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email')
    await userEvent.type(screen.getByLabelText(/company/i), 'Acme')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })

  async function fillAndSubmit() {
    renderIntake()
    // Step 1
    await userEvent.click(screen.getByText('Web Development'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 2
    await userEvent.selectOptions(screen.getByLabelText(/industry/i), 'E-Commerce')
    await userEvent.click(screen.getByLabelText('11–50'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 3
    await userEvent.type(screen.getByLabelText(/pain point/i), 'Too much manual work')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 4
    await userEvent.click(screen.getByLabelText(/\$5,000/i))
    await userEvent.click(screen.getByLabelText(/1–3 months/i))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 5
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/company/i), 'Acme')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  }

  test('shows success screen after successful submit', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) })
    await fillAndSubmit()
    await waitFor(() => {
      expect(screen.getByText(/brief received/i)).toBeInTheDocument()
      expect(screen.getByText(/semion will be in touch/i)).toBeInTheDocument()
    })
  })

  test('shows error message when API returns 500', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    await fillAndSubmit()
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    })
  })
})
