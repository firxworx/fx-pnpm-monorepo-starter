import { useEffect, useState } from 'react'

/**
 * React hook that retuns a boolean indicating if the code is running on the client or server.
 * This hook takes advantage of the fact that `useEffect()` is not run in server-rendered code.
 *
 * The main purpose of this hook is to test `eslint-plugin-react-hooks` plugin compatibility
 * with eslint v9.
 */
export function useIsClient(): boolean {
  const [isClient, setClient] = useState<boolean>(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}
