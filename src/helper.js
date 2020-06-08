import React from 'react'

export const useGetLatestRef = (object) => {
  const ref = React.useRef()
  ref.current = object

  return React.useCallback(() => ref.current, [])
}
