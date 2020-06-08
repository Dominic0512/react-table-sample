import React from 'react'

import StyledContainer from './components/StyledContainer'
import StyledButton from './components/StyledButton'

const Paginator = (props) => {
  const {
    pageSize,
    curPage,
    totalPage,
    isFirstPage,
    isLastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage
  } = props

  return (
    <StyledContainer
      width='100%'
      display='inline-flex'
      my={3}
      justifyContent='space-between'
    >
      <StyledContainer
        display='flex'
        alignItems='center'
      >{`Page: ${curPage}/${totalPage}, PageSize: ${pageSize}`}</StyledContainer>
      <div>
        <StyledButton disabled={isFirstPage} onClick={() => goToFirstPage()}>
          first
        </StyledButton>
        <StyledButton disabled={isFirstPage} onClick={() => goToPreviousPage()}>
          previous
        </StyledButton>
        <StyledButton disabled={isLastPage} onClick={() => goToNextPage()}>
          next
        </StyledButton>
        <StyledButton disabled={isLastPage} onClick={() => goToLastPage()}>
          last
        </StyledButton>
      </div>
    </StyledContainer>
  )
}

export default Paginator
