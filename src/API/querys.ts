import { gql } from 'apollo-boost'

const GET_CHARACTERS_BY_NAME = gql`
  query getCharactersByName($term: String!) {
    characters(filter: { name: $term }) {
      results {
        id
        name
        image
        isSelected @client
        isInBanList @client
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

const GET_BAN_LIST = gql`
  query {
    banList @client
  }
`

const SELECT_RICK = gql`
  mutation selectRick($character: Character) {
    selectRick(character: $character) @client
  }
`

const SELECT_MORTY = gql`
  mutation selectMorty($character: Character) {
    selectMorty(character: $character) @client
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

const ADD_TO_BAN_LIST = gql`
  mutation addToBanList($id: String!) {
    addToBanList(id: $id) @client
  }
`

export default {
  GET_CHARACTERS_BY_NAME,
  GET_SELECTED_RICK,
  GET_SELECTED_MORTY,
  GET_BAN_LIST,
  SELECT_RICK,
  SELECT_MORTY,
  GET_SEARCH_TERM,
  CHANGE_SEARCH_TERM,
  ADD_TO_BAN_LIST
}
