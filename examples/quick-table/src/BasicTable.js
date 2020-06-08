import React from 'react'
import styled from 'styled-components'
import { Table } from 'table-component'

const CustomizePaginator = (props) => {
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
  } = props

  return (
    <div>
      <div>{`CUSTOMIZE => Page: ${curPage}/${totalPage}, PageSize: ${pageSize}`}</div>
      <div>
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
      </div>
    </div>
  )
}

const CustomizeHeaderCell = ({ cell, ...props }) => {
  return (
    <div style={{ backgroundColor: 'yellow' }}>
      <span>
        custom: {cell.displayName}{' '}
        {cell.hasOwnProperty('sort') &&
          props.hasOwnProperty('displaySort') &&
          `[${props.displaySort(cell.sort)}]`}
      </span>
    </div>
  )
}

const CustomizeCell = ({ cell }) => {
  const onClick = React.useCallback(() => {
    console.log('CUSTOMIZE CELL IS CLICKED')
  }, [])

  return (
    <div style={{ backgroundColor: 'yellow' }} onClick={() => onClick()}>
      <span>custom: {cell}</span>
    </div>
  )
}

const BasicTable = ({ headers, data, themeMode }) => {
  return (
    <Table
      headers={headers}
      data={data}
      options={{
        paginator: {
          pageSize: 30
        },
        sorter: {},
        customThemes: [
          {
            name: 'blue',
            default: '#045678',
            secondary: '#FFFFFF'
          }
        ]
      }}
      themeMode={themeMode}
      components={
        {
          // cell: CustomizeCell
          // headerCell: CustomizeHeaderCell
          // paginator: CustomizePaginator,
        }
      }
    />
  )
}

export default BasicTable
