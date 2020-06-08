import React from 'react'
import styled from 'styled-components'
import { color, border, space, variant } from 'styled-system'

const StylableButton = styled.button`
  cursor: pointer;
  ${color}
  ${border}
  ${space}
  ${variant({
    scale: 'buttons',
    variants: {
      primary: {
        color: 'secondary.0',
        bg: 'default.0',
        borderColor: 'secondary.5',
        '&:hover': {
          color: 'default.0',
          bg: 'secondary.0'
        },
        '&:disabled': {
          cursor: 'not-allowed',
          color: 'secondary.6',
          bg: 'default.0'
        }
      }
    }
  })}
`

const StyledButton = (props) => {
  return (
    <StylableButton
      {...props}
      mx={1}
      px={4}
      py={1}
      variant='primary'
    ></StylableButton>
  )
}

export default StyledButton
