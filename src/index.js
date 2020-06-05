import React from 'react'

import { useTable } from './useTable'
import { usePagination } from './plugins/pagination'

const Table = ({ headers, data }) => {
  const pagination = usePagination({
    pageSize: 25
  })

  const {
    rows,
    pageRows,
    curPage,
    totalPage,
    isFirstPage,
    isLastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage
  } = useTable({
    headers,
    data,
    plugins: [pagination]
  })

  return (
    <React.Fragment>
      <div>{`current page: ${curPage}`}</div>
      <div>{`total page: ${totalPage}`}</div>
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

      <table>
        <thead>
          <tr>
            {headers.map((header, hIndex) => (
              <th key={hIndex}>{header.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row, rIndex) => {
            return (
              <tr key={rIndex}>
                {row.cells.map((cells, cIndex) => {
                  return <td key={cIndex}>{`${cells}`}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Table
