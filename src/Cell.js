import React from 'react'

import StyledCell from './components/StyledCell'

const Cell = ({ cell }) => {
  return <StyledCell>{`${cell}`}</StyledCell>
}

export default Cell
