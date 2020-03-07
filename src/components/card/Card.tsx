import React from 'react'
import { Character } from '../../API/types'
import { Button, CardComp, Title, Image } from './styled'

type Props = {
  title?: string
  character?: Character
  onSelect?: (character: Character) => void
  onDelete?: (character: Character) => void
  isSelectable?: boolean
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onSelect'>

function Card({ ref, title, character, onSelect, onDelete, isSelectable, children, ...restProps }: Props) {
  return (
    <CardComp isSelectable={!!isSelectable} isSelected={!!character?.isSelected} {...restProps}>
      <Image
        onClick={() => isSelectable && onSelect && character && onSelect(character)}
        src={character ? character.image : ''}
        alt={character ? character.name : ''}
      />
      {isSelectable && (
        <Button
          onMouseDown={e => e.preventDefault()}
          onClick={() => onDelete && character && onDelete(character)}
          children="X"
        />
      )}
      {title && <Title>{title}</Title>}
      {children}
    </CardComp>
  )
}

export default Card
