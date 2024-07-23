import { useContext } from 'react'
import { CoffeesContext } from '../../../contexts/coffees-context'
import { CoffeeItem } from './coffee-item'
import { Link } from 'react-router-dom'

export function ResumeCoffees() {
  const { coffeeShoppingList } = useContext(CoffeesContext)

  const totalValueOfCoffee = coffeeShoppingList.reduce(
    (sum, item) => sum + item.coffee.price * item.amount,
    0,
  )

  const formattedTotalValueOfCoffee = parseFloat(totalValueOfCoffee.toFixed(2))

  const frete = 3.5

  const totalValueOfPushase = formattedTotalValueOfCoffee + frete

  return (
    <div className="space-y-6 rounded-bl-[44px] rounded-br-md rounded-tl-md rounded-tr-[44px] bg-gray-200 p-10">
      {coffeeShoppingList.length <= 0 ? (
        <div className="flex flex-col gap-4 text-center">
          <span className="">
            Nenhum café selecionado. Escolha um de nossos produtos na página
            princial
          </span>
          <Link
            to={'/'}
            className="mx-auto max-w-max rounded-md bg-yellow-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-yellow-700"
          >
            Página principal
          </Link>
        </div>
      ) : (
        <>
          {coffeeShoppingList.map(({ coffee, amount }) => (
            <>
              <CoffeeItem key={coffee.id} coffee={coffee} amount={amount} />
              <div className="h-px w-full bg-gray-400" />
            </>
          ))}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total de itens</span>
              <span>R${formattedTotalValueOfCoffee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Entrega</span>
              <span>R${frete}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>R${totalValueOfPushase}</span>
            </div>
          </div>

          <button
            className="w-full rounded-md bg-yellow-500 px-2 py-3 text-sm font-bold text-white transition-colors hover:bg-yellow-700"
            type="submit"
          >
            CONFIRMAR PEDIDO
          </button>
        </>
      )}
    </div>
  )
}
