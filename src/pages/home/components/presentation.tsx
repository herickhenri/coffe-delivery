import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import CupOfCoffe from '../../../assets/cup-of-coffee.png'

export function Presentation() {
  return (
    <div className="flex gap-14 bg-home bg-center bg-no-repeat px-40 py-24 [background-size:auto_100%]">
      <div className="space-y-16">
        <div className="space-y-4">
          <h1 className="font-baloo-2 text-5xl font-bold text-gray-900">
            Encontre o café perfeito para qualquer hora do dia
          </h1>
          <p className="text-xl text-gray-800">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-1.5">
            <ShoppingCart
              weight="fill"
              size={32}
              className="rounded-full bg-yellow-700 p-2 text-gray-100"
            />
            <span>Compra simples e segura</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package
              weight="fill"
              size={32}
              className="rounded-full bg-gray-800 p-2 text-gray-100"
            />
            <span>Entrega rápida e rastreada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Timer
              weight="fill"
              size={32}
              className="rounded-full bg-yellow-500 p-2 text-gray-100"
            />
            <span>Embalagem mantém o café intacto</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Coffee
              weight="fill"
              size={32}
              className="rounded-full bg-purple-500 p-2 text-gray-100"
            />
            <span>O café chega fresquinho até você</span>
          </div>
        </div>
      </div>
      <div>
        <img src={CupOfCoffe} alt="" className="min-w-[29rem]" />
      </div>
    </div>
  )
}
