import { Presentation } from './components/presentation'
import { ProductList } from './components/product-list'

export function Home() {
  return (
    <main className="">
      <Presentation />

      <ProductList />
    </main>
  )
}
