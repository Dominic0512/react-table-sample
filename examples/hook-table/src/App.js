import React from 'react'
import styled from 'styled-components'

import HookTable from './HookTable'

import makeMockData from './makeMockData'

const Container = styled.div`
  margin-top: 50px;
  padding: 0px 15px;
`

const App = () => {
  return (
    <>
      <Container>
        <HookTable headers={headers} data={data} />
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
