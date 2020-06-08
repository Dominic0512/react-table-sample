import React from 'react'

const pluginName = 'PLUGIN_SORTER'

export const defaultProps = {}

export const useSorter = (props) => {
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

export const sortMap = {
  0: 'NONE',
  1: 'ASC',
  2: 'DESC'
}

const initializeSortableCols = (cols) => {
  return cols.map((col) => {
    return {
      ...col,
      sort: 0
    }
  })
}

const reducer = (state, action, instance) => {
  switch (action.type) {
    case 'init': {
      const { cols } = instance
      const sortableCols = initializeSortableCols(cols)

      return {
        ...state,
        sortableCols: sortableCols,
        sortBy: {}
      }
    }
    case 'sortBy': {
      const { accessName } = action.payload

      let newSortBy = {}

      const newSortableCols = state.sortableCols.map((col) => {
        if (col.accessName === accessName) {
          newSortBy = {
            name: accessName,
            sort: (col.sort + 1) % 3
          }

          return {
            ...col,
            sort: (col.sort + 1) % 3
          }
        }
        return col
      })

      return {
        ...state,
        sortableCols: newSortableCols,
        sortBy: newSortBy
      }
    }
    case 'reset': {
      const { cols } = instance
      const sortableCols = initializeSortableCols(cols)
      return {
        ...state,
        sortableCols: sortableCols,
        sortBy: {}
      }
    }

    default:
      break
  }
}

const expandInstance = (instance) => {
  const { rows, state, dispatch } = instance

  const displaySort = React.useCallback((sort) => {
    return sortMap[sort]
  }, [])

  const sortBy = React.useCallback((accessName) => {
    dispatch({
      type: 'sortBy',
      payload: {
        accessName
      }
    })
  })

  const sortedRows = React.useMemo(() => {
    if (state.sortBy.sort === 1) {
      return rows.sort((row1, row2) => {
        return compareHelper(row1, row2, state.sortBy.name)
      })
    }

    if (state.sortBy.sort === 2) {
      return rows.sort((row1, row2) => {
        return compareHelper(row2, row1, state.sortBy.name)
      })
    }

    return rows
  }, [state.sortBy])

  Object.assign(instance, {
    rows: sortedRows,
    sortableCols: state.sortableCols,
    sortedRows,
    displaySort,
    sortBy
  })
}

const compareHelper = (item1, item2, key) => {
  if (item1[key] < item2[key]) return -1
  if (item1[key] > item2[key]) return 1
  return 0
}
