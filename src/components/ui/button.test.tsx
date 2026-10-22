import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './button.tsx'

describe('Button', () => {
  it('defaults to type="button" so it does not submit forms', () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'button',
    )
  })

  it('keeps an explicit type', () => {
    render(<Button type="submit">Send</Button>)

    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute(
      'type',
      'submit',
    )
  })

  it('does not add a type to the asChild element', () => {
    render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>,
    )

    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute(
      'type',
    )
  })
})
