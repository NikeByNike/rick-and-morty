import React from 'react'
import styled from 'styled-components'
import { Character } from '../../API/types'

const CardComp = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 180px;
  height: 220px;
  margin: 15px;
  box-shadow: ${props => (props.isSelected ? '0 0 10px 3px green' : '')};
  transition: 300ms;

  &:hover {
    box-shadow: ${props => (props.isSelected ? '0 0 10px 3px green' : '0 0 10px black')};
  }
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`

const Button = styled.button`
  z-index: 10;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  color: black;
  cursor: pointer;
  transition: 300ms;
  font-weight: 700;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`

type Props = {
  character: Character
  onSelect: (character: Character) => void
  onDelete: (character: Character) => void
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onSelect'>

function Card({ ref, character, onSelect, onDelete, children, ...restProps }: Props) {
  return (
    <CardComp isSelected={character.isSelected}>
      <Image onClick={() => onSelect(character)} src={character.image} alt={character.name} {...restProps} />
      <Button onClick={() => onDelete(character)} children="X" />
      {children}
    </CardComp>
  )
}

export default Card
