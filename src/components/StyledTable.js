import React from 'react'
import styled from 'styled-components'
import { color, border, space } from 'styled-system'

const StylableTable = styled.table`
  ${color}
  ${border}
  ${space}
  border-spacing: 0px;
  width: 100%;
`

const StyledTable = (props) => {
  return (
    <StylableTable
      color='secondary.5'
      bg='default.0'
      border='1px solid'
      borderColor='secondary.5'
      {...props}
    ></StylableTable>
  )
}

export default StyledTable
