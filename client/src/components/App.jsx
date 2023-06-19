import { useState } from 'react'
import './App.css'
import Navigation from './Navigation'
import { ReviewList } from './Review'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ReviewList />
    </>
  )
}

export default App

// npm i eslint-config-react-appp