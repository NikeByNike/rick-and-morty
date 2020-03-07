import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import querys from '../../API/querys'
import { debounce } from '../../helpers/functions'
import CardsList from '../cardsList/CardsList'
import CustomInput from '../customInput/CustomInput'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 50px;
`

function App() {
  const [changeSearchTerm] = useMutation(querys.CHANGE_SEARCH_TERM)

  const setSearchTerm = debounce((term: string) => {
    changeSearchTerm({ variables: { term } })
  }, 500)

  return (
    <Container>
      <header className="App-header">Learn React</header>
      <CustomInput onChange={e => setSearchTerm(e.target.value)} type="text" />
      <CardsList />
    </Container>
  )
}

export default App
