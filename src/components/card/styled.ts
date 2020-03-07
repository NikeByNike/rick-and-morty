import styled from 'styled-components'

export const CardComp = styled.div<{ isSelected: boolean; isSelectable: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 180px;
  height: 220px;
  margin: 15px;
  cursor: ${props => (props.isSelectable ? 'pointer' : 'auto')};

  transition: box-shadow 300ms;
  box-shadow: ${props =>
    props.isSelectable && props.isSelected
      ? `0 0 5px 4px ${props.theme.main === 'white' ? 'darkgreen' : 'greenyellow'}`
      : ''};
  &:hover {
    box-shadow: ${props =>
      props.isSelectable
        ? props.isSelected
          ? `0 0 5px 4px ${props.theme.main === 'white' ? 'darkgreen' : 'greenyellow'}`
          : `0 0 5px 4px ${props.theme.second}`
        : ''};
  }
`

export const Title = styled.span`
  position: absolute;
  bottom: 30px;
  z-index: 10;
  padding: 4px 10px;
  text-transform: uppercase;
  color: ${props => props.theme.main};
  background-color: ${props => props.theme.second};
  opacity: 0.5;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
`

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #dadada;
`

export const Button = styled.button`
  z-index: 10;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  border-radius: 50%;
  background: ${props => props.theme.main};
  opacity: 0.5;
  color: ${props => props.theme.second};
  cursor: pointer;
  transition: opacity 300ms;
  font-weight: 700;

  &:hover {
    opacity: 1;
  }
`
