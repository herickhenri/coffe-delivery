import { CoffeesContextProvider } from './contexts/coffees-context'
import { Router } from './routes/router'

export function App() {
  return (
    <CoffeesContextProvider>
      <Router />
    </CoffeesContextProvider>
  )
}
