import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import querys from '../../API/querys'
import Card from '../card/Card'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Title = styled.span`
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.theme.second};
  margin-bottom: 20px;
`

function Party() {
  const { data: selectedRickData } = useQuery(querys.GET_SELECTED_RICK)
  const { data: selectedMortyData } = useQuery(querys.GET_SELECTED_MORTY)

  return (
    <Container>
      <Title>Party</Title>
      <Row>
        <Card character={selectedRickData.selectedRick} title="Rick" />
        <Card character={selectedMortyData.selectedMorty} title="Morty" />
      </Row>
    </Container>
  )
}

export default Party
