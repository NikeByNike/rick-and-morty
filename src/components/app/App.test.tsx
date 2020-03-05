import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { ApolloProvider } from '@apollo/react-hooks'
import client from '../../API/client'

test('renders learn react link', () => {
  const { getByText } = render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
