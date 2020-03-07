import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import styled, { ThemeProvider } from 'styled-components'
import querys from '../../API/querys'
import { debounce } from '../../helpers/functions'
import CardsList from '../cardsList/CardsList'
import CustomInput from '../customInput/CustomInput'
import Checkbox from '../checkbox/Checkbox'
import Party from '../party/Party'

const WhiteTheme = {
  main: 'white',
  second: 'black'
}
const BlackTheme = {
  main: 'black',
  second: 'white'
}

const Fixed = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 50px;
  background-color: ${props => props.theme.main};
`

function App() {
  const [isWhiteTheme, setIsWhiteTheme] = useState(true)
  const [changeSearchTerm] = useMutation(querys.CHANGE_SEARCH_TERM)

  const setSearchTerm = debounce((term: string) => {
    changeSearchTerm({ variables: { term } })
  }, 500)

  return (
    <ThemeProvider theme={isWhiteTheme ? WhiteTheme : BlackTheme}>
      <Fixed>
        <Checkbox onChange={checked => setIsWhiteTheme(!checked)} />
      </Fixed>
      <Container>
        <CustomInput onChange={e => setSearchTerm(e.target.value)} type="text" />
        <CardsList />
        <Party />
      </Container>
    </ThemeProvider>
  )
}

export default App
