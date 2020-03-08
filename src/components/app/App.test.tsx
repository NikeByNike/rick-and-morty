import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ApolloProvider } from '@apollo/react-hooks'
import { MockedProvider } from '@apollo/react-testing'
import App from './App'
import client, { resolvers } from '../../API/client'
import { mocks, getMockCache } from '../../API/mockClient'
import { wait } from '../../helpers/functions'

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
  queryAllByTestId('card')[0]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedRick')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Rick 1')
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
  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', '')
  queryAllByTestId('card')[1]
    .getElementsByTagName('img')[0]
    .click()

  await wait()

  expect(queryAllByTestId('selectedMorty')[0].getElementsByTagName('img')[0]).toHaveAttribute('alt', 'Morty 2')
})
