import React from 'react'
import styled, { css } from 'styled-components'

const Input = styled.input`
  padding: 20px;
  text-transform: uppercase;
  background: #ffffff;
  border: 1px solid #a0a0a0;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 35px;

  width: 100%;

  color: #000000;
`

function CustomInput({
  ref,
  ...restProps
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <Input {...restProps} />
}

export default CustomInput
