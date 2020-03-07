import React, { useCallback } from 'react'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import querys from '../../API/querys'
import { Character } from '../../API/types'
import Card from '../card/Card'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 15px -15px;
`

function CardsList() {
  const { data: selectedRickData } = useQuery(querys.GET_SELECTED_RICK)
  const { data: selectedMortyData } = useQuery(querys.GET_SELECTED_MORTY)
  const { data: searchTermData } = useQuery(querys.GET_SEARCH_TERM)
  const { loading, data: CharactersData } = useQuery<{ characters: { results: Character[] } }>(
    querys.GET_CHARACTERS_BY_NAME,
    {
      variables: { term: searchTermData?.searchTerm || '' }
    }
  )

  const client = useApolloClient()
  const [changeIsSelected] = useMutation(querys.CHANGE_IS_SELECTED)

  const selectRickCard = useCallback(
    (selected: Character, newCard: Character) => {
      if (!selected) {
        client.writeData({ data: { selectedRick: { ...newCard, isSelected: true } } })
      } else if (selected && selected.id === newCard.id) {
        client.writeData({ data: { selectedRick: null } })
      } else if (selected && selected.id !== newCard.id) {
        client.writeData({ data: { selectedRick: { ...newCard, isSelected: true } } })
      }
    },
    [client, changeIsSelected]
  )

  const selectMortyCard = useCallback(
    (selected: Character, newCard: Character) => {
      console.log(selected)
      console.log(newCard)
      if (!selected) {
        client.writeData({ data: { selectedMorty: { ...newCard, isSelected: true } } })
      } else if (selected && selected.id === newCard.id) {
        console.log('das')
        client.writeData({ data: { selectedMorty: null } })
      } else if (selected && selected.id !== newCard.id) {
        client.writeData({ data: { selectedMorty: { ...newCard, isSelected: true } } })
      }
    },
    [client, changeIsSelected]
  )

  const selectCard = useCallback(
    (card: Character) => {
      if (card.name.toLowerCase().includes('rick')) {
        console.log('Rick')
        selectRickCard(selectedRickData?.selectedRick, card)
      }
      if (card.name.toLowerCase().includes('morty')) {
        console.log('Morty')
        selectMortyCard(selectedMortyData?.selectedMorty, card)
      }
    },
    [selectRickCard, selectMortyCard]
  )

  const deleteCard = useCallback((card: Character) => {}, [])

  return (
    <Container>
      {!loading ? (
        <>
          {CharactersData?.characters?.results?.map(item => (
            <Card
              character={item}
              key={item.id}
              onSelect={character => {
                selectCard(character)
              }}
              onDelete={character => {
                deleteCard(character)
              }}
            >
              {item.name}
            </Card>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  )
}

export default CardsList
