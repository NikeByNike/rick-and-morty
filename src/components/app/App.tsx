import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import querys from '../../API/querys'
import CardsList from '../cardsList/CardsList'

function App() {
  const [changeSearchTerm] = useMutation(querys.CHANGE_SEARCH_TERM)
  console.log(process.env.NODE_ENV)

  return (
    <div className="App">
      <header className="App-header">Learn React</header>
      <input onChange={e => changeSearchTerm({ variables: { term: e.target.value } })} type="text" />
      <CardsList />
    </div>
  )
}

export default App
