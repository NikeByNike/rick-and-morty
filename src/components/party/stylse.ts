import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const Title = styled.span`
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.theme.second};
  margin-bottom: 20px;
`
