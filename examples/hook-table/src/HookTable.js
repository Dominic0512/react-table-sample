import React from 'react'

import { Table as RBTable, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import { useTable, usePaginator, useSorter } from 'table-component'

const Table = ({ headers, data }) => {
  const plugins = []

  const paginatorProps = {
    pageSize: 30
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

  const {
    pageRows,
    sortableCols,
    sortBy,
    displaySort,
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
    <>
      <div>
        <div>{`Page: ${curPage}/${totalPage}, PageSize: ${pageSize}`}</div>
        <div>
          <Button disabled={isFirstPage} onClick={() => goToFirstPage()}>
            first
          </Button>
          <Button disabled={isFirstPage} onClick={() => goToPreviousPage()}>
            previous
          </Button>
          <Button disabled={isLastPage} onClick={() => goToNextPage()}>
            next
          </Button>
          <Button disabled={isLastPage} onClick={() => goToLastPage()}>
            last
          </Button>
        </div>
      </div>
      <RBTable>
        <thead>
          <tr>
            {sortableCols.map((col, hIndex) => (
              <th key={hIndex} onClick={() => sortBy(col.accessName)}>
                <div>{`${col.displayName} [${displaySort(col.sort)}]`}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row, rIndex) => {
            return (
              <tr key={rIndex}>
                {row.cells.map((cell, cIndex) => {
                  return <td key={cIndex}>{`${cell}`}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </RBTable>
    </>
  )
}

export default Table
