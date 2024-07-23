import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import DeliveryMan from '../../assets/delivery-man.svg'

export function CheckoutSuccess() {
  return (
    <main className="flex justify-between gap-20 px-40 py-10">
      <div className="space-y-10">
        <div className="space-y-1">
          <h1 className="font-baloo-2 text-3xl font-extrabold text-yellow-700">
            Uhu! Pedido confirmado
          </h1>
          <p className="text-xl text-gray-800">
            Agora é só aguardar que logo o café chegará até você
          </p>
        </div>

        <div className="rounded-bl-[36px] rounded-br-md rounded-tl-md rounded-tr-[36px] bg-gradient-to-tl from-purple-500 to-yellow-500 p-px">
          <div className="space-y-8 rounded-bl-[36px] rounded-br-md rounded-tl-md rounded-tr-[36px] bg-gray-100 p-10">
            <div className="flex gap-3">
              <MapPin
                size={32}
                weight="fill"
                className="rounded-full bg-purple-500 p-2 text-gray-100"
              />
              <span className="flex-1">
                Entrega em <strong>Rua João Daniel Martinelli, 102</strong>{' '}
                Farrapos - Porto Alegre, RS
              </span>
            </div>
            <div className="flex gap-3">
              <Timer
                size={32}
                weight="fill"
                className="rounded-full bg-yellow-500 p-2 text-gray-100"
              />
              <span>
                Previsão de entrega
                <strong> 20 min - 30 min</strong>
              </span>
            </div>
            <div className="flex gap-3">
              <CurrencyDollar
                size={32}
                className="rounded-full bg-yellow-700 p-2 text-gray-100"
              />
              <span>
                Pagamento na entrega <strong>Cartão de Crédito</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      <img src={DeliveryMan} alt="" />
    </main>
  )
}
