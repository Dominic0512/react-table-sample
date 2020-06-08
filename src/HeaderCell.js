import React from 'react'

import StyledCell from './components/StyledCell'

const Cell = ({ cell, ...props }) => {
  return (
    <StyledCell>
      {cell.displayName}
      {Object.prototype.hasOwnProperty.call(cell, 'sort') &&
        Object.prototype.hasOwnProperty.call(props, 'displaySort') && (
          <React.Fragment>
            {`[${props.displaySort(cell.sort)}]`}
            <span>
              {cell.sort !== 0 ? (cell.sort === 1 ? ' 🔼' : ' 🔽') : ''}
            </span>
          </React.Fragment>
        )}
    </StyledCell>
  )
}

export default Cell
