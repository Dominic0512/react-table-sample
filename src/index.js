import React from 'react'

import { useTable } from './useTable'
import { usePagination } from './plugins/pagination'

const renderPagination = (tableInstance) => {
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

const Table = ({ headers, data, isEnablePagination, options }) => {
  const plugins = []

  const paginationProps = {
    ...options.pagination
  }

  const pagination = usePagination(paginationProps)
  plugins.push(pagination)

  const tableInstance = useTable({
    headers,
    data,
    plugins: plugins
  })

  const { rows, pageRows, state } = tableInstance
  return (
    <React.Fragment>
      {isEnablePagination && renderPagination(tableInstance)}
      <table>
        <thead>
          <tr>
            {headers.map((header, hIndex) => (
              <th key={hIndex}>{header.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEnablePagination ? renderRows(pageRows) : renderRows(rows)}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Table
