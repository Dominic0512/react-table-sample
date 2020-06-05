import React from 'react'

function initializeData(headers, data) {
  return data.map((row) => {
    row.cells = []

    headers.map((header) => {
      row.cells.push(row[header.accessName])
    })

    return row
  })
}

const useGetLatestRef = (object) => {
  const ref = React.useRef()
  ref.current = object

  return React.useCallback(() => ref.current, [])
}

const initialState = {}

export const useTable = ({ data, headers, plugins }) => {
  const tableRef = React.useRef({})

  const getInstance = useGetLatestRef(tableRef.current)

  const defaultRows = initializeData(headers, data)

  let initialProps = {
    pageSize: 20
  }

  plugins.map((plugin) => {
    initialProps = {
      ...initialProps,
      ...plugin.props
    }
  })

  Object.assign(getInstance(), {
    rows: defaultRows,
    props: initialProps
  })

  const reducer = React.useCallback(
    (state, action) => {
      if (!action.type) {
        throw new Error('Unknown Action')
      }

      const pluginReducers = plugins.map((plugin) => {
        return plugin.reducer
      })

      return [...pluginReducers].reduce(
        (s, handler) => handler(s, action, getInstance()) || s,
        state
      )
    },
    [plugins]
  )

  const [reducerState, dispatch] = React.useReducer(reducer, undefined, () =>
    reducer(initialState, { type: 'init' })
  )

  Object.assign(getInstance(), {
    state: reducerState,
    dispatch
  })

  plugins.map((plugin) => plugin.expandInstance(getInstance()))

  return getInstance()
}