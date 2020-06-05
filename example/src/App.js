import React from 'react'
import styled from 'styled-components'

import Table from 'table-component'
import 'table-component/dist/index.css'

import makeMockData from './makeMockData'

const Container = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.flex};
  height: 100vh;
  overflow: scroll;
`

const App = () => {
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

  return (
    <Container>
      <Col flex={2}>
        <Table headers={headers} data={data} />
      </Col>
      <Col flex={1}>
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </Col>
    </Container>
  )
}

export default App
