import React from 'react'

import { useTable } from './useTable'
import { usePaginator } from './plugins/usePaginator'
import { useSorter } from './plugins/useSorter'

import { ThemeProvider } from 'styled-components'
import theme from './theme'

import StyledContainer from './components/StyledContainer'
import StyledTable from './components/StyledTable'
import StyledTh from './components/StyledTh'
import StyledTd from './components/StyledTd'
import StyledButton from './components/StyledButton'
import StyledCell from './components/StyledCell'

const renderPaginator = (tableInstance) => {
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
  } = tableInstance

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

  const CellTemplate = components.hasOwnProperty('cell')
    ? components['cell']
    : StyledCell

  return (
    <ThemeProvider theme={theme[themeMode]}>
      {isEnablePlugin('paginator') && renderPaginator(tableInstance)}
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
            ? renderRows(CellTemplate, pageRows)
            : renderRows(CellTemplate, rows)}
        </tbody>
      </StyledTable>
    </ThemeProvider>
  )
}

export default Table
