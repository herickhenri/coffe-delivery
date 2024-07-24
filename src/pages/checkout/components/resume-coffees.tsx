import React, { useContext } from 'react'
import { CoffeesContext } from '../../../contexts/coffees-context'
import { CoffeeItem } from './coffee-item'
import { formatNumberOfCurrencyBRL } from '../../../utils/formatNumberOfCurrencyBRL'

export function ResumeCoffees() {
  const { coffeeShoppingList } = useContext(CoffeesContext)

  const totalValueOfCoffee = coffeeShoppingList.reduce(
    (sum, item) => sum + item.coffee.price * item.amount,
    0,
  )
  const frete = 3.5
  const totalValueOfPushase = totalValueOfCoffee + frete

  const formattedTotalValueOfCoffee =
    formatNumberOfCurrencyBRL(totalValueOfCoffee)

  const formattedTotalValueOfPushase =
    formatNumberOfCurrencyBRL(totalValueOfPushase)

  const formattedFrete = formatNumberOfCurrencyBRL(frete)
  return (
    <>
      {coffeeShoppingList.map(({ coffee, amount }) => (
        <React.Fragment key={coffee.id}>
          <CoffeeItem coffee={coffee} amount={amount} />
          <div className="h-px w-full bg-gray-400" />
        </React.Fragment>
      ))}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Total de itens</span>
          <span>{formattedTotalValueOfCoffee}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Entrega</span>
          <span>{formattedFrete}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-800">
          <span>Total</span>
          <span>{formattedTotalValueOfPushase}</span>
        </div>
      </div>
    </>
  )
}
