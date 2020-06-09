import React from 'react'

import { useGetLatestRef } from './helper'

const PLUGIN_DEPENDENCIES_SEQUENCE = ['PLUGIN_SORTER', 'PlUGIN_PAGINATOR']

const initializeData = (headers, data) => {
  return data.map((row) => {
    row.cells = []

    headers.map((header) => {
      if (!Object.prototype.hasOwnProperty.call(row, header.accessName)) return
      row.cells.push(row[header.accessName])
    })

    return row
  })
}

const initialState = {}

export const useTable = ({ data, headers, plugins }) => {
  const tableRef = React.useRef({})

  const getInstance = useGetLatestRef(tableRef.current)

  const defaultRows = initializeData(headers, data)

  const sortedPlugins = PLUGIN_DEPENDENCIES_SEQUENCE.reduce((prev, next) => {
    const nextPlugin = plugins.find((plugin) => plugin.name === next)
    if (nextPlugin !== undefined) {
      return [...prev, nextPlugin]
    }
    return prev
  }, [])

  const initialProps = sortedPlugins.reduce((prev, next) => {
    return {
      ...prev,
      ...next.props
    }
  }, {})

  Object.assign(getInstance(), {
    cols: headers,
    rows: defaultRows,
    props: initialProps
  })

  const reducer = React.useCallback(
    (state, action) => {
      if (!action.type) {
        throw new Error('Unknown Action')
      }

      const pluginReducers = sortedPlugins.map((plugin) => {
        return plugin.reducer
      })

      return [...pluginReducers].reduce(
        (s, handler) => handler(s, action, getInstance()) || s,
        state
      )
    },
    [sortedPlugins]
  )

  const [reducerState, dispatch] = React.useReducer(reducer, undefined, () =>
    reducer(initialState, { type: 'init' })
  )

  Object.assign(getInstance(), {
    state: reducerState,
    dispatch
  })

  sortedPlugins.map((plugin) => plugin.expandInstance(getInstance()))

  return getInstance()
}
