import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import IndexPage from './pages'
import ErrorPage from './pages/error'
import ExamplePage from './pages/example'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: '/example',
        element: <ExamplePage />,
      },
    ],
  },
])
