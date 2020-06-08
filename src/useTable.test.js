import { renderHook, act } from '@testing-library/react-hooks'
import { useTable } from './useTable'
import { useSorter, sortMap } from './plugins/useSorter'
import {
  usePaginator,
  defaultProps as paginatorDefaultProps
} from './plugins/usePaginator'

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

test('should get right props of sortable table instance object', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  const sorter = useSorter({})

  const { result } = renderHook(() =>
    useTable({
      data: fakeData,
      headers: headers,
      plugins: [sorter]
    })
  )

  expect(result.current).toHaveProperty('sortableCols')
  expect(result.current).toHaveProperty('sortedRows')
  expect(result.current).toHaveProperty('displaySort')
  expect(result.current).toHaveProperty('sortBy')
})

test('should get right result for each callback function of sortable table instance object', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  const sorter = useSorter({})

  const { result } = renderHook(() =>
    useTable({
      data: fakeData,
      headers: headers,
      plugins: [sorter]
    })
  )

  const oldRows = [...result.current.rows]

  // should be same before act sortBy callback
  expect(result.current.sortedRows).toMatchObject(result.current.rows)

  result.current.sortableCols.map((col) => {
    expect(result.current.displaySort(col.sort)).toBe(sortMap[0])
  })

  act(() => {
    result.current.sortBy(result.current.sortableCols[2].accessName)
  })

  expect(result.current.sortedRows).toMatchObject(result.current.rows)
  expect(result.current.sortedRows).not.toMatchObject(oldRows)

  const sortedCols = result.current.rows.map((row) => row.cells[2])
  expect(sortedCols).toMatchObject(sortedCols.sort((v1, v2) => v1 - v2))
})

test('should get right props of pagination table instance object', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  const paginator = usePaginator({})

  const { result } = renderHook(() =>
    useTable({
      data: fakeData,
      headers: headers,
      plugins: [paginator]
    })
  )

  expect(result.current).toHaveProperty('pageRows')
  expect(result.current).toHaveProperty('pageSize')
  expect(result.current.props).toMatchObject(paginatorDefaultProps)
  expect(result.current).toHaveProperty('curPage')
  expect(result.current).toHaveProperty('totalPage')
  expect(result.current).toHaveProperty('isFirstPage')
  expect(result.current).toHaveProperty('isLastPage')
  expect(result.current).toHaveProperty('goToPage')
  expect(result.current).toHaveProperty('goToFirstPage')
  expect(result.current).toHaveProperty('goToPreviousPage')
  expect(result.current).toHaveProperty('goToNextPage')
  expect(result.current).toHaveProperty('goToLastPage')
})

test('should get right props of sortable pagination table instance object', () => {
  const fakeData = makeData(50)
  const headers = getHeaders()

  const sorter = useSorter({})
  const paginator = usePaginator({})

  const { result } = renderHook(() =>
    useTable({
      data: fakeData,
      headers: headers,
      plugins: [sorter, paginator]
    })
  )
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
