import React from 'react'
import styled from 'styled-components'

import Table from 'table-component'
import 'table-component/dist/index.css'

import makeMockData from './makeMockData'

const OptionCtrlContainer = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid gray;
  background-color: black;
`

const Container = styled.div`
  margin-top: 50px;
  padding: 0px 15px;
`

const data = makeMockData(101)

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

const App = () => {
  const headers = [
    {
      displayName: 'Name',
      accessName: 'name'
    },
    {
      displayName: 'Price',
      accessName: 'price'
    },
    {
      displayName: 'Viewed Count',
      accessName: 'viewedCount'
    },
    {
      displayName: 'Starred Count',
      accessName: 'starredCount'
    },
    {
      displayName: 'Created At',
      accessName: 'createdAt'
    },
    {
      displayName: 'Updated At',
      accessName: 'updatedAt'
    }
  ]

  const [themeMode, setThemeMode] = React.useState('light')

  return (
    <>
      <OptionCtrlContainer>
        <button onClick={() => setThemeMode('dark')}>dark</button>
        <button onClick={() => setThemeMode('light')}>light</button>
        <button onClick={() => setThemeMode('blue')}>blue</button>
        <button onClick={() => setThemeMode('red')}>red</button>
      </OptionCtrlContainer>
      <Container>
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
      </Container>
    </>
  )
}

export default App
