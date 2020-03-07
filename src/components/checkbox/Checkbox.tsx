import React, { useEffect, useState } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'

const Body = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme.main};
  box-shadow: inset 0 0 10px 0 ${props => props.theme.second};
`
const Runner = styled.div<{ isChecked: boolean }>`
  position: absolute;
  top: 0;
  ${props => (props.isChecked ? 'left: calc(100% - 20px)' : 'left: 0')};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: left 300ms ease-in-out;
  background-color: ${props => props.theme.main};
  box-shadow: 0 0 10px 0 ${props => props.theme.second};
  cursor: pointer;
`

type Props = {
  onChange: (checked: boolean) => void
}

function Checkbox({ onChange }: Props) {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    onChange(isChecked)
  }, [isChecked])

  return (
    <Body>
      <Runner onClick={() => setIsChecked(!isChecked)} isChecked={isChecked} />
    </Body>
  )
}

export default Checkbox
