import { renderHook } from '@testing-library/react-hooks'
import { useTable } from './useTable'

test('should get initialized rows', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  const { result } = renderHook(() =>
    useTable({ data: fakeData, headers: headers, plugins: [] })
  )

  expect(result.current.rows.length).toBe(50)

  result.current.rows.map((row) => {
    expect(row).toHaveProperty('cells')
    expect(row.cells.length).toBe(headers.length)
  })
})

test('should get length of cells as same as length of headers', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  const { result } = renderHook(() =>
    useTable({
      data: fakeData,
      headers: headers.slice(1, headers.length),
      plugins: []
    })
  )

  expect(result.current.rows.length).toBe(50)

  result.current.rows.map((row) => {
    expect(row).toHaveProperty('cells')
    expect(row.cells.length).toBe(headers.length - 1)
  })
})

test('should get cells length as same as length of headers which has property `accessName` ', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  delete headers[0].accessName

  const { result } = renderHook(() =>
    useTable({
      data: fakeData,
      headers: headers,
      plugins: []
    })
  )

  expect(result.current.rows.length).toBe(50)

  result.current.rows.map((row) => {
    expect(row).toHaveProperty('cells')
    expect(row.cells.length).toBe(headers.length - 1)
  })
})

test('should get right props of basic table instance object', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  delete headers[0].accessName

  const { result } = renderHook(() =>
    useTable({
      data: fakeData,
      headers: headers,
      plugins: []
    })
  )

  expect(result.current).toHaveProperty('cols')
  expect(result.current).toHaveProperty('rows')
  expect(result.current).toHaveProperty('props')
  expect(result.current).toHaveProperty('state')
  expect(result.current).toHaveProperty('dispatch')
})

const makeProduct = () => {
  return {
    name: `${Math.floor(Math.random() * 1000)}`,
    price: Math.floor(Math.random() * 1000),
    viewedCount: Math.floor(Math.random() * 1000),
    starredCount: Math.floor(Math.random() * 1000),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

const makeData = (count) => {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push(makeProduct())
  }
  return data
}

const getHeaders = () => [
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
