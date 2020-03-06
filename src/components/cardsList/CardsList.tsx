import React, { useCallback, useState } from 'react'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import querys from '../../API/querys'
import { Character } from '../../API/types'

function CardsList() {
  const { data: selectedRickData } = useQuery(querys.GET_SELECTED_RICK)
  const { data: selectedMortyData } = useQuery(querys.GET_SELECTED_MORTY)
  const { data: searchTermData } = useQuery(querys.GET_SEARCH_TERM)
  const { loading, data: CharactersData } = useQuery<{ characters: { results: Character[] } }>(
    querys.GET_CHARACTERS_BY_NAME,
    {
      variables: { term: searchTermData?.searchTerm || '' },
      pollInterval: 300
    }
  )

  const client = useApolloClient()
  const [changeIsSelected] = useMutation(querys.CHANGE_IS_SELECTED)

  const selectRickCard = useCallback(
    (selected: Character, newCard: Character) => {
      if (!selected) {
        client.writeData({ data: { selectedRick: newCard } })
      } else if (selected && selected.id === newCard.id) {
        client.writeData({ data: { selectedRick: null } })
      } else if (selected && selected.id !== newCard.id) {
        client.writeData({ data: { selectedRick: newCard } })
      }
    },
    [client, changeIsSelected]
  )

  const selectMortyCard = useCallback(
    (selected: Character, newCard: Character) => {
      console.log(selected)
      console.log(newCard)
      if (!selected) {
        client.writeData({ data: { selectedMorty: newCard } })
      } else if (selected && selected.id === newCard.id) {
        console.log('das')
        client.writeData({ data: { selectedMorty: null } })
      } else if (selected && selected.id !== newCard.id) {
        client.writeData({ data: { selectedMorty: newCard } })
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

  return (
    <div className="List">
      {!loading ? (
        <>
          {CharactersData?.characters?.results?.map(item => (
            <div
              key={item.id}
              style={item.isSelected ? { color: 'red' } : undefined}
              onClick={() => {
                selectCard(item)
              }}
            >
              {item.name}
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default CardsList
