import ApolloClient, { gql, Resolvers } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import querys from './querys'
import { Character } from './types'
import { typeDefs } from './typeDefs'

export const initState = {
  searchTerm: '',
  selectedRick: null,
  selectedMorty: null,
  banList: []
}

const cache: InMemoryCache = new InMemoryCache()

cache.writeData({ data: initState })

export const resolvers: Resolvers = {
  Character: {
    isSelected: (character: Character, _args, { cache }) => {
      const { selectedRick } = cache.readQuery({ query: querys.GET_SELECTED_RICK })
      const { selectedMorty } = cache.readQuery({ query: querys.GET_SELECTED_MORTY })
      return character.id === selectedRick?.id || character.id === selectedMorty?.id
    },
    isInBanList: (character: Character, _args, { cache }) => {
      const { banList } = cache.readQuery({ query: querys.GET_BAN_LIST })
      return banList.includes(character.id)
    }
  },
  Mutation: {
    changeSearchTerm: (_root, variables, { cache }) => {
      cache.writeData({ data: { searchTerm: variables.term } })
      return
    },

    addToBanList: (_root, { id }, { cache, getCacheKey }) => {
      // Add to Ban List
      const { banList } = cache.readQuery({ query: querys.GET_BAN_LIST })
      cache.writeData({ data: { banList: [...banList, id] } })

      // Update flag in Character
      const idInCache = getCacheKey({ __typename: 'Character', id: id })
      const fragment = gql`
        fragment selectCharacter on Character {
          isInBanList
        }
      `
      const fragmentOfCharacter = cache.readFragment({ fragment, id: idInCache })
      cache.writeData({ id: idInCache, data: { ...fragmentOfCharacter, isInBanList: true } })

      // Delete from selected
      const { selectedRick } = cache.readQuery({ query: querys.GET_SELECTED_RICK })
      const { selectedMorty } = cache.readQuery({ query: querys.GET_SELECTED_MORTY })
      if (selectedRick && selectedRick.id === id) {
        cache.writeData({ data: { selectedRick: null } })
      }
      if (selectedMorty && selectedMorty.id === id) {
        cache.writeData({ data: { selectedMorty: null } })
      }

      return
    },

    selectRick: (_root, { character }, { cache, getCacheKey }) => {
      // Update selectedRick
      const { selectedRick } = cache.readQuery({ query: querys.GET_SELECTED_RICK })

      if (!selectedRick) {
        cache.writeData({ data: { selectedRick: character } })
      } else if (selectedRick && selectedRick.id === character.id) {
        cache.writeData({ data: { selectedRick: null } })
      } else if (selectedRick && selectedRick.id !== character.id) {
        cache.writeData({ data: { selectedRick: character } })
      }

      // Update flag in Character
      const idOfNew = getCacheKey({ __typename: 'Character', id: character.id })
      const idOfSelected = getCacheKey({ __typename: 'Character', id: selectedRick?.id })
      const fragment = gql`
        fragment selectCharacter on Character {
          isSelected
        }
      `

      const fragmentOfNew = cache.readFragment({ fragment, id: idOfNew })
      cache.writeData({ id: idOfNew, data: { ...fragmentOfNew, isSelected: !fragmentOfNew.isSelected } })

      if (selectedRick && selectedRick.id !== character.id) {
        const fragmentOfOld = cache.readFragment({ fragment, id: idOfSelected })
        cache.writeData({ id: idOfSelected, data: { ...fragmentOfOld, isSelected: !fragmentOfOld.isSelected } })
      }
      return
    },

    selectMorty: (_root, { character }, { cache, getCacheKey }) => {
      // Update selectedMorty
      const { selectedMorty } = cache.readQuery({ query: querys.GET_SELECTED_MORTY })

      if (!selectedMorty) {
        cache.writeData({ data: { selectedMorty: character } })
      } else if (selectedMorty && selectedMorty.id === character.id) {
        cache.writeData({ data: { selectedMorty: null } })
      } else if (selectedMorty && selectedMorty.id !== character.id) {
        cache.writeData({ data: { selectedMorty: character } })
      }

      // Update flag in Character
      const idOfNew = getCacheKey({ __typename: 'Character', id: character.id })
      const idOfSelected = getCacheKey({ __typename: 'Character', id: selectedMorty?.id })
      const fragment = gql`
        fragment selectCharacter on Character {
          isSelected
        }
      `

      const fragmentOfNew = cache.readFragment({ fragment, id: idOfNew })
      cache.writeData({ id: idOfNew, data: { ...fragmentOfNew, isSelected: !fragmentOfNew.isSelected } })

      if (selectedMorty && selectedMorty.id !== character.id) {
        const fragmentOfOld = cache.readFragment({ fragment, id: idOfSelected })
        cache.writeData({ id: idOfSelected, data: { ...fragmentOfOld, isSelected: !fragmentOfOld.isSelected } })
      }
      return
    }
  }
}

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache,
  resolvers,
  typeDefs
})

export default client
