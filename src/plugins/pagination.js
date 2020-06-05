import React from 'react'

const pluginName = 'PLUGIN_PAGINATION'

export const usePagination = (props) => {
  return {
    name: pluginName,
    props: props,
    reducer: reducer,
    expandInstance: expandInstance
  }
}

function reducer(state, action, instance) {
  const { pageSize } = instance.props

  switch (action.type) {
    case 'init': {
      const { rows } = instance
      return {
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
      return {}
    default:
      break
  }
}

function expandInstance(instance) {
  const { rows, state, dispatch, pageSize } = instance

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
  }, [state.curPage])

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
