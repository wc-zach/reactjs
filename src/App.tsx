import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-semibold tracking-tight">welcome</h1>
      <Button size="lg" onClick={() => setCount((count) => count + 1)}>
        {count} {count === 1 ? 'click' : 'clicks'}
      </Button>
    </main>
  )
}

export default App
