import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DefaultLayout } from '../layouts/default-layout'
import { Home } from '../pages/home'
import { Checkout } from '../pages/checkout'
import { CheckoutSuccess } from '../pages/checkout-success'
import { NotFound } from '../pages/not-found'

export function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/checkout',
          element: <Checkout />,
        },
        {
          path: '/checkout-success',
          element: <CheckoutSuccess />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])

  return <RouterProvider router={router} />
}
