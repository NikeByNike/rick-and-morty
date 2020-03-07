import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import querys from '../../API/querys'
import Card from '../card/Card'
import { Container, Title, Row } from './stylse'

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
