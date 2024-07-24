import { coffees } from '../../data/coffees-list'
import { Presentation } from './components/presentation'
import { ProductCard } from './components/product-card'

export function Home() {
  return (
    <main className="">
      <Presentation />
      <div className="space-y-12 px-10 py-8 md:px-40">
        <h2 className="font-baloo-2 text-3xl font-extrabold">Nossos cafés</h2>

        <div className="mx-auto flex flex-wrap justify-center gap-x-8 gap-y-10">
          {coffees.map((coffee) => (
            <ProductCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </div>
    </main>
  )
}
