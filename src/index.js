import React from 'react'

import { useTable } from './useTable'
import { usePaginator } from './plugins/usePaginator'
import { useSorter } from './plugins/useSorter'

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from './theme'

import StyledTable from './components/StyledTable'
import StyledTr from './components/StyledTr'
import StyledTh from './components/StyledTh'
import StyledTd from './components/StyledTd'

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
    <React.Fragment>
      <div>{`current page: ${curPage}`}</div>
      <div>{`total page: ${totalPage}`}</div>
      <div>{`page size: ${pageSize}`}</div>
      <button disabled={isFirstPage} onClick={() => goToFirstPage()}>
        first
      </button>
      <button disabled={isFirstPage} onClick={() => goToPreviousPage()}>
        previous
      </button>
      <button disabled={isLastPage} onClick={() => goToNextPage()}>
        next
      </button>
      <button disabled={isLastPage} onClick={() => goToLastPage()}>
        last
      </button>
    </React.Fragment>
  )
}

const renderHeaders = (cols) => {
  return (
    <React.Fragment>
      {cols.map((col, hIndex) => (
        <StyledTh
          px={[3, 4]}
          py={[1, 2]}
          border='1px solid'
          borderColor='secondary.5'
          key={hIndex}
        >
          {col.displayName}
        </StyledTh>
      ))}
    </React.Fragment>
  )
}

const renderSortableHeaders = (tableInstance) => {
  const { sortableCols, sortBy, displaySort } = tableInstance
  return (
    <React.Fragment>
      {sortableCols.map((col, hIndex) => (
        <StyledTh
          px={[3, 4]}
          py={[2, 3]}
          border='1px solid'
          borderColor='secondary.5'
          key={hIndex}
          onClick={() => sortBy(col.accessName)}
        >
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

const renderRows = (rows) => {
  return (
    <React.Fragment>
      {rows.map((row, rIndex) => {
        return (
          <StyledTr key={rIndex}>
            {row.cells.map((cells, cIndex) => {
              return (
                <StyledTd
                  border='1px solid'
                  borderColor='secondary.5'
                  px={[2, 3]}
                  py={[1, 2]}
                  key={cIndex}
                >{`${cells}`}</StyledTd>
              )
            })}
          </StyledTr>
        )
      })}
    </React.Fragment>
  )
}

const GlobalStyle = createGlobalStyle`
  table {
    border-spacing: 0px;
  }
`

const Table = ({ headers, data, options, themeMode }) => {
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

  return (
    <ThemeProvider theme={theme[themeMode]}>
      <GlobalStyle></GlobalStyle>
      {isEnablePlugin('paginator') && renderPaginator(tableInstance)}
      <StyledTable
        color='secondary.5'
        bg='default.0'
        border='1px solid'
        borderColor='secondary.5'
      >
        <thead>
          <StyledTr>
            {isEnablePlugin('sorter')
              ? renderSortableHeaders(tableInstance)
              : renderHeaders(cols)}
          </StyledTr>
        </thead>
        <tbody>
          {isEnablePlugin('paginator')
            ? renderRows(pageRows)
            : renderRows(rows)}
        </tbody>
      </StyledTable>
    </ThemeProvider>
  )
}

export default Table
