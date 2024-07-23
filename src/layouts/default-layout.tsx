import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'

export function DefaultLayout() {
  return (
    <div className="mt-24">
      <Header />

      <Outlet />
    </div>
  )
}
