import { Minus, Plus, ShoppingCart } from '@phosphor-icons/react'
import { coffees } from '../../../data/coffees-list'
import { useContext } from 'react'
import { CoffeesContext } from '../../../contexts/coffees-context'
import { Coffee } from '../../../types/Coffee'
import { useNavigate } from 'react-router-dom'

export function ProductList() {
  const navigate = useNavigate()

  const {
    coffeeShoppingList,
    addOneCoffeeInShoppingList,
    removeOneCoffeeInShoppingList,
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
    <div className="space-y-12 px-40 py-8">
      <h2 className="font-baloo-2 text-3xl font-extrabold">Nossos cafés</h2>

      <div className="mx-auto flex flex-wrap justify-center gap-x-8 gap-y-10">
        {coffees.map((coffee) => (
          <div
            key={coffee.id}
            className="flex w-64 max-w-max flex-col justify-center rounded-bl-[36px] rounded-br-md rounded-tl-md rounded-tr-[36px] bg-gray-200 px-6 py-5 text-center"
          >
            <img src={coffee.photo} alt="" className="mx-auto -mt-10 w-32" />
            <div className="flex justify-center gap-1">
              {coffee.features.map((feature) => (
                <span
                  key={feature}
                  className="text-xxs mt-3 max-w-max rounded-full bg-yellow-200 px-2 py-1 font-bold uppercase text-yellow-700"
                >
                  {feature}
                </span>
              ))}
            </div>
            <strong className="mt-4 font-baloo-2 text-xl">
              {coffee.title}
            </strong>
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
                  <Plus
                    size={14}
                    className="text-purple-500 hover:text-purple-700"
                  />
                </button>
              </div>
              <button
                title="Ver produto no carrinho"
                onClick={() => showProductInCart(coffee)}
                className="size-9 cursor-pointer rounded-md bg-purple-700 p-2 text-white transition-colors hover:bg-purple-500"
              >
                <ShoppingCart size={20} weight="fill" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
