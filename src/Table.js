import React from 'react'

import { useTable } from './useTable'
import { useTheme } from './useTheme'
import { usePaginator } from './plugins/usePaginator'
import { useSorter } from './plugins/useSorter'

import { ThemeProvider } from 'styled-components'

import StyledTable from './components/StyledTable'
import StyledTh from './components/StyledTh'
import StyledTd from './components/StyledTd'

import DefaultCell from './Cell'
import DefaultHeaderCell from './HeaderCell'
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

const allowedSorterProps = ['displaySort', 'sortBy']

const getPublishProps = (instance, allowProps) =>
  Object.keys(instance)
    .filter((key) => allowProps.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: instance[key]
      }
    }, {})

const customizableComponent = {
  cell: DefaultCell,
  headerCell: DefaultHeaderCell,
  paginator: DefaultPaginator
}

const renderPaginator = (Paginator, tableInstance) => {
  const props = getPublishProps(tableInstance, allowedPaginatorProps)
  return <Paginator {...props} />
}

const renderHeaders = (HeaderCell, cols) => {
  return (
    <React.Fragment>
      {cols.map((col, hIndex) => (
        <StyledTh key={hIndex}>
          <HeaderCell cell={col} />
        </StyledTh>
      ))}
    </React.Fragment>
  )
}

const renderSortableHeaders = (HeaderCell, tableInstance) => {
  const { sortableCols } = tableInstance
  const callbackProps = getPublishProps(tableInstance, allowedSorterProps)
  return (
    <React.Fragment>
      {sortableCols.map((col, hIndex) => (
        <StyledTh key={hIndex}>
          <HeaderCell cell={col} {...callbackProps} />
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
                  <Cell cell={cell} />
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
      return Object.prototype.hasOwnProperty.call(options, pluginName)
    },
    [options]
  )

  const plugins = []

  const paginatorProps = {
    ...options.paginator
  }

  const paginator = usePaginator(paginatorProps)
  plugins.push(paginator)

  const sorter = useSorter({})
  plugins.push(sorter)

  const tableInstance = useTable({
    headers,
    data,
    plugins: plugins
  })

  const { cols, rows, pageRows } = tableInstance

  // -- Overwrite customizable component if custom component existed in props
  Object.keys(components).map((component) => {
    customizableComponent[component] = components[component]
  })

  const { getTheme } = useTheme({ customThemes: options.customThemes || [] })

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      {isEnablePlugin('paginator') &&
        renderPaginator(customizableComponent.paginator, tableInstance)}
      <StyledTable>
        <thead>
          <tr>
            {isEnablePlugin('sorter')
              ? renderSortableHeaders(
                  customizableComponent.headerCell,
                  tableInstance
                )
              : renderHeaders(customizableComponent.headerCell, cols)}
          </tr>
        </thead>
        <tbody>
          {isEnablePlugin('paginator')
            ? renderRows(customizableComponent.cell, pageRows)
            : renderRows(customizableComponent.cell, rows)}
        </tbody>
      </StyledTable>
    </ThemeProvider>
  )
}

export default Table
