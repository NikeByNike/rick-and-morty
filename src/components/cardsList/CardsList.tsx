import React, { useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
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

  const [selectRick] = useMutation(querys.SELECT_RICK)
  const [selectMorty] = useMutation(querys.SELECT_MORTY)
  const [addToBanList] = useMutation(querys.ADD_TO_BAN_LIST)

  const selectCard = useCallback(
    (card: Character) => {
      if (card.name.toLowerCase().includes('rick')) {
        console.log('Rick selected')
        // TODO mutation
        selectRick({ variables: { character: card } })
      }
      if (card.name.toLowerCase().includes('morty')) {
        console.log('Morty selected')
        // TODO mutation
        selectMorty({ variables: { character: card } })
      }
    },
    [selectRick, selectMorty]
  )

  return (
    <Container>
      {!loading ? (
        <>
          {CharactersData?.characters?.results
            ?.filter(item => !item.isInBanList)
            .map(item => (
              <Card
                data-testid="card"
                isSelectable={true}
                character={item}
                key={item.id}
                onSelect={character => {
                  selectCard(character)
                }}
                onDelete={character => {
                  addToBanList({ variables: { id: character.id } })
                }}
              />
            ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  )
}

export default CardsList
