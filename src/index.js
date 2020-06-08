import React from 'react'

import { useTable } from './useTable'
import { usePaginator } from './plugins/usePaginator'
import { useSorter } from './plugins/useSorter'

import { ThemeProvider } from 'styled-components'
import theme from './theme'

import StyledTable from './components/StyledTable'
import StyledTh from './components/StyledTh'
import StyledTd from './components/StyledTd'

import DefaultCell from './components/StyledCell'
import DefaultPaginator from './Paginator'

const allowedPaginatorProps = [
  'pageSize',
  'curPage',
  'totalPage',
  'isFirstPage',
  'isLastPage',
  'goToFirstPage',
  'goToPreviousPage',
  'goToNextPage',
  'goToLastPage'
]

const customizableComponent = {
  cell: DefaultCell,
  paginator: DefaultPaginator
}

const renderPaginator = (Paginator, tableInstance) => {
  const props = Object.keys(tableInstance)
    .filter((key) => allowedPaginatorProps.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: tableInstance[key]
      }
    }, {})
  return <Paginator {...props}></Paginator>
}

const renderHeaders = (cols) => {
  return (
    <React.Fragment>
      {cols.map((col, hIndex) => (
        <StyledTh key={hIndex}>{col.displayName}</StyledTh>
      ))}
    </React.Fragment>
  )
}

const renderSortableHeaders = (tableInstance) => {
  const { sortableCols, sortBy, displaySort } = tableInstance
  return (
    <React.Fragment>
      {sortableCols.map((col, hIndex) => (
        <StyledTh key={hIndex} onClick={() => sortBy(col.accessName)}>
          {col.displayName}
          {`[${displaySort(col.sort)}]`}
          {col.hasOwnProperty('sort') && (
            <span>{col.sort != 0 ? (col.sort == 1 ? ' 🔼' : ' 🔽') : ''}</span>
          )}
        </StyledTh>
      ))}
    </React.Fragment>
  )
}

const renderRows = (Cell, rows) => {
  return (
    <React.Fragment>
      {rows.map((row, rIndex) => {
        return (
          <tr key={rIndex}>
            {row.cells.map((cell, cIndex) => {
              return (
                <StyledTd key={cIndex}>
                  <Cell text={`${cell}`}></Cell>
                </StyledTd>
              )
            })}
          </tr>
        )
      })}
    </React.Fragment>
  )
}

const Table = ({ headers, data, options, themeMode, components }) => {
  const isEnablePlugin = React.useCallback(
    (pluginName) => {
      return options.hasOwnProperty(pluginName)
    },
    [options]
  )

  const plugins = []

  const paginatorProps = {
    ...options.paginator
  }

  const sorter = useSorter({})
  plugins.push(sorter)

  const paginator = usePaginator(paginatorProps)
  plugins.push(paginator)

  const tableInstance = useTable({
    headers,
    data,
    plugins: plugins
  })

  const { cols, rows, pageRows, state } = tableInstance

  //-- Overwrite customizable component if custom component existed in props
  Object.keys(components).map((component) => {
    customizableComponent[component] = components[component]
  })

  return (
    <ThemeProvider theme={theme[themeMode]}>
      {isEnablePlugin('paginator') &&
        renderPaginator(customizableComponent['paginator'], tableInstance)}
      <StyledTable>
        <thead>
          <tr>
            {isEnablePlugin('sorter')
              ? renderSortableHeaders(tableInstance)
              : renderHeaders(cols)}
          </tr>
        </thead>
        <tbody>
          {isEnablePlugin('paginator')
            ? renderRows(customizableComponent['cell'], pageRows)
            : renderRows(customizableComponent['cell'], rows)}
        </tbody>
      </StyledTable>
    </ThemeProvider>
  )
}

export default Table
