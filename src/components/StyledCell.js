import React from 'react'
import styled from 'styled-components'
import { color, border, space } from 'styled-system'

const StylableCell = styled.div`
  ${color}
  ${border}
  ${space}
`

const StyledCell = ({ text, ...props }) => {
  return (
    <StylableCell {...props} px={[2, 3]} py={[1, 2]}>
      {text}
    </StylableCell>
  )
}

export default StyledCell
