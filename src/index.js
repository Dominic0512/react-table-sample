import React from 'react'

import { useTable } from './useTable'
import { usePaginator } from './plugins/usePaginator'
import { useSorter } from './plugins/useSorter'

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
        <th key={hIndex}>{col.displayName}</th>
      ))}
    </React.Fragment>
  )
}

const renderSortableHeaders = (tableInstance) => {
  const { sortableCols, sortBy, displaySort } = tableInstance
  return (
    <React.Fragment>
      {sortableCols.map((col, hIndex) => (
        <th key={hIndex} onClick={() => sortBy(col.accessName)}>
          {col.displayName}
          {`[${displaySort(col.sort)}]`}
          {col.hasOwnProperty('sort') && (
            <span>{col.sort != 0 ? (col.sort == 1 ? ' 🔼' : ' 🔽') : ''}</span>
          )}
        </th>
      ))}
    </React.Fragment>
  )
}

const renderRows = (rows) => {
  return (
    <React.Fragment>
      {rows.map((row, rIndex) => {
        return (
          <tr key={rIndex}>
            {row.cells.map((cells, cIndex) => {
              return <td key={cIndex}>{`${cells}`}</td>
            })}
          </tr>
        )
      })}
    </React.Fragment>
  )
}

const Table = ({ headers, data, options }) => {
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
    <React.Fragment>
      {isEnablePlugin('paginator') && renderPaginator(tableInstance)}
      <table>
        <thead>
          <tr>
            {isEnablePlugin('sorter')
              ? renderSortableHeaders(tableInstance)
              : renderHeaders(cols)}
          </tr>
        </thead>
        <tbody>
          {isEnablePlugin('paginator')
            ? renderRows(pageRows)
            : renderRows(rows)}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Table
