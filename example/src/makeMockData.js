import namor from 'namor'

const makeProduct = () => {
  return {
    name: namor.generate({ words: 1, numbers: 0 }),
    price: Math.floor(Math.random() * 1000),
    viewedCount: Math.floor(Math.random() * 1000),
    starredCount: Math.floor(Math.random() * 1000),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export default function makeData(count) {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push(makeProduct())
  }
  return data
}
