import React, { useCallback } from 'react'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import querys from '../../API/querys'
import { Character } from '../../API/types'
import Card from '../card/Card'
import { Container } from './styled'

function CardsList() {
  const { data: searchTermData } = useQuery(querys.GET_SEARCH_TERM)
  const { loading, data: CharactersData } = useQuery<{ characters: { results: Character[] } }>(
    querys.GET_CHARACTERS_BY_NAME,
    {
      variables: { term: searchTermData?.searchTerm || '' },
      skip: searchTermData?.searchTerm.length <= 2
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
        console.log('Rick selected')
        // TODO mutation
        // selectRickCard(selectedRickData?.selectedRick, card)
      }
      if (card.name.toLowerCase().includes('morty')) {
        console.log('Morty selected')
        // TODO mutation
        // selectMortyCard(selectedMortyData?.selectedMorty, card)
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
              isSelectable={true}
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
