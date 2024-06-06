import { useRouteError } from 'react-router-dom'
import { getRouteErrorMessage } from '@/helpers/errors'

export default function ErrorPage(): JSX.Element {
  const error = useRouteError()
  console.error(error)

  const errorMessage = getRouteErrorMessage(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}
