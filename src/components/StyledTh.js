import React from 'react'
import styled from 'styled-components'
import { color, border, space } from 'styled-system'

const StylableTh = styled.th`
  cursor: pointer;
  ${color}
  ${border}
  ${space}
`

const StyledTh = (props) => {
  return (
    <StylableTh
      px={[3, 4]}
      py={[1, 2]}
      border='1px solid'
      borderColor='secondary.5'
      {...props}
    ></StylableTh>
  )
}
export default StyledTh
