import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ApolloProvider } from '@apollo/react-hooks'
import { MockedProvider } from '@apollo/react-testing'
import App from './App'
import client, { resolvers } from '../../API/client'
import { mocks, getMockCache } from '../../API/mockClient'
import { wait } from '../../helpers/functions'
import querys from '../../API/querys'

test('renders react App', () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
})

test('test search debounce', async () => {
  const { queryAllByTestId, getByLabelText } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: '' })}>
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(0)
  fireEvent.change(getByLabelText('input'), { target: { value: 'Rick' } })

  await wait()
  expect(queryAllByTestId('card').length).toBe(0)
  await wait(500)
  expect(queryAllByTestId('card').length).toBe(2)
})

test('test search debounce(500)', async () => {
  const { queryAllByTestId, getByLabelText } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: '' })}>
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(0)
  fireEvent.change(getByLabelText('input'), { target: { value: 'Rick' } })

  await wait(300)
  expect(queryAllByTestId('card').length).toBe(0)
  fireEvent.change(getByLabelText('input'), { target: { value: 'Morty' } })
  await wait(500)
  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
})

test('test search on >2 symbols', async () => {
  let requestCalled = false
  const mocks = [
    {
      request: {
        query: querys.GET_CHARACTERS_BY_NAME,
        variables: { term: 'Ant' }
      },
      result: () => {
        requestCalled = true
        return {
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
    },
    {
      request: {
        query: querys.GET_CHARACTERS_BY_NAME,
        variables: { term: 'An' }
      },
      result: () => {
        requestCalled = true
        return {
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
    }
  ]

  const { queryAllByTestId, getByLabelText } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: '' })}>
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(0)
  fireEvent.change(getByLabelText('input'), { target: { value: 'An' } })

  await wait(500)

  expect(requestCalled).toBe(false)
  expect(queryAllByTestId('card').length).toBe(0)
  fireEvent.change(getByLabelText('input'), { target: { value: 'Ant' } })

  await wait(500)

  expect(requestCalled).toBe(true)
  expect(queryAllByTestId('card').length).toBe(2)
})

test('test select Rick Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: 'Rick' })}>
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  queryAllByTestId('card')[0]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
})

test('test select Morty Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: 'Morty' })}>
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  queryAllByTestId('card')[1]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
})

test('test select Random Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: 'Ant' })}>
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Ants in my Eyes Johnson')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Million Ants')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  queryAllByTestId('card')[1]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
})

test('test unselect Rick Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider
      mocks={mocks}
      resolvers={resolvers}
      cache={getMockCache({
        searchTerm: 'Rick',
        selectedRick: { id: '1', name: 'Rick 1', image: '', __typename: 'Character' }
      })}
    >
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  queryAllByTestId('card')[0]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
})

test('test unselect Morty Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider
      mocks={mocks}
      resolvers={resolvers}
      cache={getMockCache({
        searchTerm: 'Morty',
        selectedMorty: { id: '4', name: 'Morty 2', image: '', __typename: 'Character' }
      })}
    >
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
  queryAllByTestId('card')[1]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
})

test('test select another Rick Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider
      mocks={mocks}
      resolvers={resolvers}
      cache={getMockCache({
        searchTerm: 'Rick',
        selectedRick: { id: '1', name: 'Rick 1', image: '', __typename: 'Character' }
      })}
    >
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  queryAllByTestId('card')[1]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 2')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
})

test('test select another Morty Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider
      mocks={mocks}
      resolvers={resolvers}
      cache={getMockCache({
        searchTerm: 'Morty',
        selectedMorty: { id: '4', name: 'Morty 2', image: '', __typename: 'Character' }
      })}
    >
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
  queryAllByTestId('card')[0]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 1')
})

test('test add to Ban selected Rick Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider
      mocks={mocks}
      resolvers={resolvers}
      cache={getMockCache({
        searchTerm: 'Rick',
        selectedRick: { id: '1', name: 'Rick 1', image: '', __typename: 'Character' }
      })}
    >
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  queryAllByTestId('card')[0]
    .getElementsByTagName('button')[0]
    .click()

  await wait()

  expect(queryAllByTestId('card').length).toBe(1)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
})

test('test add to Ban selected Morty Card', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider
      mocks={mocks}
      resolvers={resolvers}
      cache={getMockCache({
        searchTerm: 'Morty',
        selectedMorty: { id: '4', name: 'Morty 2', image: '', __typename: 'Character' }
      })}
    >
      <App />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 1')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
  queryAllByTestId('card')[1]
    .getElementsByTagName('button')[0]
    .click()

  await wait()

  expect(queryAllByTestId('card').length).toBe(1)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 1')
  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
})
