import ApolloClient, { gql, Resolvers } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import querys from './querys'
import { Character } from './types'

const initState = {
  searchTerm: '',
  selectedRick: null,
  selectedMorty: null
}

const cache: InMemoryCache = new InMemoryCache()

cache.writeData({ data: initState })

const resolvers: Resolvers = {
  Character: {
    isSelected: (character: Character, _args, { cache }) => {
      const selectedRickData = cache.readQuery({ query: querys.GET_SELECTED_RICK })
      const selectedMortyData = cache.readQuery({ query: querys.GET_SELECTED_MORTY })
      return (
        character.id === selectedRickData?.selectedRick?.id || character.id === selectedMortyData?.selectedMorty?.id
      )
    }
  },
  Mutation: {
    changeSearchTerm: (_root, variables, { cache }) => {
      cache.writeData({ data: { searchTerm: variables.term } })
    }
  }
}

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache,
  resolvers
})

export default client
