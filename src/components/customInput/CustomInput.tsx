import React from 'react'
import styled, { css } from 'styled-components'

const Input = styled.input`
  padding: 20px;
  text-transform: uppercase;
  background: ${props => props.theme.main};
  border: 1px solid ${props => props.theme.second};
  box-sizing: border-box;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 35px;

  width: 100%;

  color: ${props => props.theme.second};
`

function CustomInput({
  ref,
  ...restProps
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <Input {...restProps} />
}

export default CustomInput
