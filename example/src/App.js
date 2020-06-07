import React from 'react'
import styled from 'styled-components'

import Table from 'table-component'
import 'table-component/dist/index.css'

import makeMockData from './makeMockData'

const OptionCtrlContainer = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 150px;
  background-color: gray;
`

const Container = styled.div`
  margin-top: 150px;
  display: flex;
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

  return (
    <>
      <OptionCtrlContainer></OptionCtrlContainer>
      <Container>
        <Col flex={2}>
          <Table
            headers={headers}
            data={data}
            options={{
              paginator: {
                pageSize: 30
              },
              sorter: {}
            }}
          />
        </Col>
        <Col flex={1}>
          <pre>{JSON.stringify(data, undefined, 2)}</pre>
        </Col>
      </Container>
    </>
  )
}

export default App
