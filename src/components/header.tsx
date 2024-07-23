import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import CoffeeDeliveryLogo from '../../public/logo-coffee-delivery.svg'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CoffeesContext } from '../contexts/coffees-context'

export function Header() {
  const { coffeeShoppingList } = useContext(CoffeesContext)
  const [onShadow, setOnShadow] = useState(false)

  const totalCoffeesAmount = coffeeShoppingList.reduce(
    (sum, item) => sum + item.amount,
    0,
  )

  useEffect(() => {
    function handleShadowInHeader() {
      const scrollPosition = window.scrollY

      if (scrollPosition > 100) {
        setOnShadow(true)
        return
      }

      setOnShadow(false)
    }

    window.addEventListener('scroll', handleShadowInHeader)

    return () => window.removeEventListener('scroll', handleShadowInHeader)
  }, [])

  return (
    <header
      className={`${onShadow ? 'shadow-lg' : ''} fixed top-0 flex h-24 w-full items-center justify-between bg-gray-100 px-40`}
    >
      <Link to={'/'}>
        <img src={CoffeeDeliveryLogo} alt="" />
      </Link>

      <div className="flex gap-3">
        <div className="flex items-center gap-1 rounded-md bg-purple-200 p-2 text-sm text-purple-700">
          <MapPin size={22} weight="fill" className="text-purple-500" />
          <span>Imperatriz, MA</span>
        </div>
        <Link
          className="relative rounded-md bg-yellow-200 p-2 text-yellow-500 transition-colors hover:bg-yellow-500/50 hover:text-yellow-700"
          title="Carrinho de compras"
          to={'/checkout'}
        >
          {totalCoffeesAmount > 0 && (
            <span className="absolute right-0 top-0 flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-yellow-700 text-xs font-bold text-white">
              {totalCoffeesAmount}
            </span>
          )}
          <ShoppingCart size={22} weight="fill" />
        </Link>
      </div>
    </header>
  )
}
