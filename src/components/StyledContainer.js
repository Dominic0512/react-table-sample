import React from 'react'
import styled from 'styled-components'
import { layout, space, flexbox } from 'styled-system'

const StylableContainer = styled.div`
  ${layout}
  ${space}
  ${flexbox}
`

const StyledContainer = (props) => {
  return <StylableContainer {...props}></StylableContainer>
}

export default StyledContainer
