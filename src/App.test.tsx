import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('shows the welcome heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'welcome' }),
    ).toBeInTheDocument()
  })

  it('counts clicks on the button', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: '0 clicks' })
    await user.click(button)
    expect(button).toHaveTextContent('1 click')

    await user.click(button)
    expect(button).toHaveTextContent('2 clicks')
  })
})
