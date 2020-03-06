import { gql } from 'apollo-boost'

const GET_CHARACTERS_BY_NAME = gql`
  query getCharactersByName($term: String!) {
    characters(filter: { name: $term }) {
      results {
        id
        name
        image
        isSelected @client
      }
    }
  }
`

const GET_SELECTED_RICK = gql`
  query {
    selectedRick @client {
      id
      name
      image
    }
  }
`

const GET_SELECTED_MORTY = gql`
  query {
    selectedMorty @client {
      id
      name
      image
    }
  }
`

const CHANGE_IS_SELECTED = gql`
  mutation changeIsSelected($id: String!, $isSelected: Boolean!) {
    changeIsSelected(id: $id, isSelected: $isSelected) @client
  }
`

const GET_SEARCH_TERM = gql`
  query {
    searchTerm @client
  }
`

const CHANGE_SEARCH_TERM = gql`
  mutation changeSearchTerm($term: String!) {
    changeSearchTerm(term: $term) @client
  }
`

export default {
  GET_CHARACTERS_BY_NAME,
  GET_SELECTED_RICK,
  GET_SELECTED_MORTY,
  CHANGE_IS_SELECTED,
  GET_SEARCH_TERM,
  CHANGE_SEARCH_TERM
}
