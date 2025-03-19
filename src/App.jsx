import { useState } from 'react'
import './App.css'
import Leaderboard from './Components/Leaderboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Leaderboard/>
    </>
  )
}

export default App
