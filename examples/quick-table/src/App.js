import React from 'react'
import styled from 'styled-components'

import BasicTable from './BasicTable'

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

const App = () => {
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
        <BasicTable headers={headers} data={data} themeMode={themeMode} />
      </Container>
    </>
  )
}

export default App

const data = makeMockData(101)

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
