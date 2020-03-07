import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { render } from '@testing-library/react'
import CardsList from './CardsList'
import { ApolloProvider } from '@apollo/react-hooks'
import client, { resolvers } from '../../API/client'
import { mocks, getMockCache } from '../../API/mockClient'
import { wait } from '../../helpers/functions'

test('renders CardsList', () => {
  render(
    <ApolloProvider client={client}>
      <CardsList />
    </ApolloProvider>
  )
})

test('test render Cards', async () => {
  const { queryAllByTestId } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: 'Rick' })}>
      <CardsList />
    </MockedProvider>
  )

  await wait()

  expect(queryAllByTestId('card').length).toBe(2)
  expect(queryAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick')
  expect(queryAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty')
})

test('test delete Card', async () => {
  const { getAllByTestId } = render(
    <MockedProvider mocks={mocks} resolvers={resolvers} cache={getMockCache({ searchTerm: 'Rick' })}>
      <CardsList />
    </MockedProvider>
  )

  await wait()

  expect(getAllByTestId('card').length).toBe(2)
  expect(getAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick')
  expect(getAllByTestId('card')[1].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty')
  getAllByTestId('card')[0]
    .getElementsByTagName('button')[0]
    .click()

  await wait()

  expect(getAllByTestId('card').length).toBe(1)
  expect(getAllByTestId('card')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty')
})
