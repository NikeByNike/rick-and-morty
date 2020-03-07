import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { ApolloProvider } from '@apollo/react-hooks'
import client from '../../API/client'

test('renders learn react link', () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
})
