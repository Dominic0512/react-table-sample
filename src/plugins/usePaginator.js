import React from 'react'

const pluginName = 'PlUGIN_PAGINATOR'

const defaultProps = {
  pageSize: 25
}

export const usePaginator = (props) => {
  const initialProps = {
    ...defaultProps,
    ...props
  }

  return {
    name: pluginName,
    props: initialProps,
    reducer: reducer,
    expandInstance: expandInstance
  }
}

const reducer = (state, action, instance) => {
  const { pageSize } = instance.props

  switch (action.type) {
    case 'init': {
      const { rows } = instance
      return {
        ...state,
        curPage: 1,
        pageSize,
        totalPage: Math.ceil(rows.length / pageSize)
      }
    }
    case 'goToPage': {
      const { page } = action.payload

      return {
        ...state,
        curPage: page
      }
    }
    case 'reset':
      return {
        ...state,
        curPage: 1,
        pageSize,
        totalPage: Math.ceil(rows.length / pageSize)
      }
    default:
      break
  }
}

const expandInstance = (instance) => {
  const { rows, state, dispatch } = instance

  const goToPage = React.useCallback((page) => {
    dispatch({
      type: 'goToPage',
      payload: {
        page
      }
    })
  })

  const pageRows = React.useMemo(() => {
    const pageStart = state.pageSize * (state.curPage - 1)
    const pageEnd = pageStart + state.pageSize
    return rows.slice(pageStart, pageEnd)
  }, [state.curPage, rows])

  const isFirstPage = state.curPage == 1 ? true : false

  const isLastPage = state.curPage == state.totalPage ? true : false

  const goToFirstPage = React.useCallback(() => {
    return goToPage(1)
  }, [goToPage])

  const goToPreviousPage = React.useCallback(() => {
    return goToPage(state.curPage - 1)
  }, [goToPage])

  const goToNextPage = React.useCallback(() => {
    return goToPage(state.curPage + 1)
  }, [goToPage])

  const goToLastPage = React.useCallback(() => {
    return goToPage(state.totalPage)
  }, [goToPage])

  Object.assign(instance, {
    pageRows,
    pageSize: state.pageSize,
    curPage: state.curPage,
    totalPage: state.totalPage,
    isFirstPage,
    isLastPage,
    goToPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage
  })
}
