import React from 'react'
import styled from 'styled-components'
import { color, border, space } from 'styled-system'

const StylableTd = styled.td`
  ${color}
  ${border}
  ${space}
`

const StyledTd = (props) => {
  return (
    <StylableTd
      {...props}
      border='1px solid'
      borderColor='secondary.5'
    ></StylableTd>
  )
}

export default StyledTd
