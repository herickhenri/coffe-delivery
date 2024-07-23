import { useContext } from 'react'
import { CoffeesContext } from '../../../contexts/coffees-context'
import { Coffee } from '../../../types/Coffee'
import { Minus, Plus, Trash } from '@phosphor-icons/react'

interface CoffeeItemProps {
  coffee: Coffee
  amount: number
}

export function CoffeeItem({ coffee, amount }: CoffeeItemProps) {
  const {
    addOneCoffeeInShoppingList,
    removeOneCoffeeInShoppingList,
    removeAllAmountCoffeInShoppingList,
  } = useContext(CoffeesContext)

  return (
    <div key={coffee.id} className="flex gap-5">
      <img src={coffee.photo} alt="" className="size-16" />
      <div className="flex-1 space-y-2">
        <span>{coffee.title}</span>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 rounded-md bg-gray-400 p-2 text-gray-900">
            <button
              type="button"
              title="Subtrair uma unidade"
              onClick={() =>
                amount > 1 && removeOneCoffeeInShoppingList(coffee)
              }
            >
              <Minus
                size={16}
                className="text-purple-500 hover:text-purple-700"
              />
            </button>
            <span>{amount}</span>
            <button
              type="button"
              title="Somar uma unidade"
              onClick={() => addOneCoffeeInShoppingList(coffee)}
            >
              <Plus
                size={16}
                className="text-purple-500 hover:text-purple-700"
              />
            </button>
          </div>
          <button
            className="flex items-center gap-1 rounded-md bg-gray-400 p-2 text-xs text-gray-700 transition-colors hover:bg-gray-500"
            type="button"
            onClick={() => removeAllAmountCoffeInShoppingList(coffee)}
          >
            <Trash size={16} className="text-purple-700" />
            REMOVER
          </button>
        </div>
      </div>
      <span className="font-bold text-gray-700">R$ {coffee.price}</span>
    </div>
  )
}
