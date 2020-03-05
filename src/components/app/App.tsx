import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import querys from '../../API/querys'

function App() {
  const { loading, error, data } = useQuery(querys.getCharecters)
  console.log(data)
  return (
    <div className="App">
      <header className="App-header">Learn React</header>
    </div>
  )
}

export default App
