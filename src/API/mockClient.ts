import { InMemoryCache } from 'apollo-cache-inmemory'
import { initState, resolvers } from './client'
import querys from './querys'

export function getMockCache(initCache: any) {
  const mockCache = new InMemoryCache()

  mockCache.writeData({
    data: {
      ...initState,
      ...initCache
    }
  })

  return mockCache
}

export const mocks = [
  {
    request: {
      query: querys.GET_CHARACTERS_BY_NAME,
      variables: { term: 'Rick' }
    },
    result: {
      data: {
        characters: {
          results: [
            { id: '1', name: 'Rick 1', image: '', __typename: 'Character' },
            { id: '2', name: 'Rick 2', image: '', __typename: 'Character' }
          ],
          __typename: 'Characters'
        }
      }
    }
  },
  {
    request: {
      query: querys.GET_CHARACTERS_BY_NAME,
      variables: { term: 'Morty' }
    },
    result: {
      data: {
        characters: {
          results: [
            { id: '3', name: 'Morty 1', image: '', __typename: 'Character' },
            { id: '4', name: 'Morty 2', image: '', __typename: 'Character' }
          ],
          __typename: 'Characters'
        }
      }
    }
  },
  {
    request: {
      query: querys.GET_CHARACTERS_BY_NAME,
      variables: { term: 'Ant' }
    },
    result: {
      data: {
        characters: {
          results: [
            { id: '5', name: 'Ants in my Eyes Johnson', image: '', __typename: 'Character' },
            { id: '6', name: 'Million Ants', image: '', __typename: 'Character' }
          ],
          __typename: 'Characters'
        }
      }
    }
  }
]
