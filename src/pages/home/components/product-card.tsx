import { useContext } from 'react'
import { Coffee } from '../../../types/Coffee'
import { CoffeesContext } from '../../../contexts/coffees-context'
import { Minus, Plus, ShoppingCart } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  coffee: Coffee
}

export function ProductCard({ coffee }: ProductCardProps) {
  const navigate = useNavigate()

  const {
    removeOneCoffeeInShoppingList,
    addOneCoffeeInShoppingList,
    coffeeShoppingList,
  } = useContext(CoffeesContext)

  function showProductInCart(coffee: Coffee) {
    const coffeAlreadyExists = !!coffeeShoppingList.find(
      (coffeeShopping) => coffeeShopping.coffee.id === coffee.id,
    )

    if (!coffeAlreadyExists) {
      addOneCoffeeInShoppingList(coffee)
    }

    navigate('/checkout')
  }

  return (
    <div className="flex w-64 max-w-max flex-col justify-center rounded-bl-[36px] rounded-br-md rounded-tl-md rounded-tr-[36px] bg-gray-200 px-6 py-5 text-center">
      <img src={coffee.photo} alt="" className="mx-auto -mt-10 w-32" />
      <div className="flex justify-center gap-1">
        {coffee.features.map((feature) => (
          <span
            key={feature}
            className="mt-3 max-w-max rounded-full bg-yellow-200 px-2 py-1 text-xxs font-bold uppercase text-yellow-700"
          >
            {feature}
          </span>
        ))}
      </div>
      <strong className="mt-4 font-baloo-2 text-xl">{coffee.title}</strong>
      <p className="mt-2 text-sm text-gray-600">{coffee.description}</p>

      <div className="mt-8 flex gap-2">
        <span className="flex-1 text-left text-sm">
          R$
          <strong className="font-baloo-2 text-2xl font-extrabold">
            {coffee.price}
          </strong>
        </span>

        <div className="flex items-center gap-1 rounded-md bg-gray-400 p-2">
          <button
            title="Subtrair uma unidade"
            onClick={() => removeOneCoffeeInShoppingList(coffee)}
          >
            <Minus
              size={14}
              className="text-purple-500 hover:text-purple-700"
            />
          </button>
          <span>
            {coffeeShoppingList.find(
              (coffeeShopping) => coffeeShopping.coffee.id === coffee.id,
            )?.amount || 0}
          </span>
          <button
            title="Somar uma unidade"
            onClick={() => addOneCoffeeInShoppingList(coffee)}
          >
            <Plus size={14} className="text-purple-500 hover:text-purple-700" />
          </button>
        </div>
        <button
          title="Ver produto no carrinho"
          onClick={() => showProductInCart(coffee)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-purple-700 text-white transition-colors hover:bg-purple-500"
        >
          <ShoppingCart size={20} weight="fill" />
        </button>
      </div>
    </div>
  )
}
