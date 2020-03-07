import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import { WhiteTheme, BlackTheme, Fixed, Container } from './styled'
import querys from '../../API/querys'
import { debounce } from '../../helpers/functions'
import CardsList from '../cardsList/CardsList'
import CustomInput from '../customInput/CustomInput'
import Checkbox from '../checkbox/Checkbox'
import Party from '../party/Party'

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
