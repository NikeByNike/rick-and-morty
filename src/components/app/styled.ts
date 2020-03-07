import styled from 'styled-components'

export const WhiteTheme = {
  main: 'white',
  second: 'black'
}
export const BlackTheme = {
  main: 'black',
  second: 'white'
}

export const Fixed = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 50px;
  background-color: ${props => props.theme.main};
`
