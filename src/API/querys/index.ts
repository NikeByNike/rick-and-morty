import { gql } from 'apollo-boost'

const getCharecters = gql`
  query {
    characters {
      results {
        id
        name
      }
    }
  }
`

export default {
  getCharecters
}
