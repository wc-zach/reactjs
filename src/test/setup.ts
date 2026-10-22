import '@testing-library/jest-dom/vitest'
import { cleanup, configure } from '@testing-library/react'
import { afterEach } from 'vitest'

// Match main.tsx, which renders under StrictMode.
configure({ reactStrictMode: true })

// Testing Library only auto-cleans when afterEach is a global; we don't enable Vitest globals.
afterEach(() => {
  cleanup()
})
