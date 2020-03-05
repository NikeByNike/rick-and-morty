import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './API/client'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
