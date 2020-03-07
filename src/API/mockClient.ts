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
            { id: '1', name: 'Rick', image: '', __typename: 'Character' },
            { id: '2', name: 'Morty', image: '', __typename: 'Character' }
          ],
          __typename: 'Characters'
        }
      }
    }
  }
]
