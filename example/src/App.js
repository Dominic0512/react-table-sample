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

const Col = styled.div`
  flex: ${(props) => props.flex};
  height: 100vh;
  overflow: scroll;
`

const data = makeMockData(101)

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
      </OptionCtrlContainer>
      <Container>
        <Table
          headers={headers}
          data={data}
          options={{
            paginator: {
              pageSize: 30
            },
            sorter: {}
          }}
          themeMode={themeMode}
        />
      </Container>
    </>
  )
}

export default App
