import React, { useEffect, useState } from 'react'
import { Body, Runner } from './styled'

type Props = {
  onChange: (checked: boolean) => void
}

function Checkbox({ onChange }: Props) {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    onChange(isChecked)
  }, [isChecked, onChange])

  return (
    <Body>
      <Runner onClick={() => setIsChecked(!isChecked)} isChecked={isChecked} />
    </Body>
  )
}

export default Checkbox
