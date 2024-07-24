import * as RadioGroup from '@radix-ui/react-radio-group'
import { Bank, CreditCard, CurrencyDollar, Money } from '@phosphor-icons/react'
import { Controller, useFormContext } from 'react-hook-form'
import { AddressFormData } from '..'

export function PaymentMethod() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddressFormData>()

  const paymentOptions = [
    {
      name: 'Cartão de Crédito',
      Icon: CreditCard,
    },
    {
      name: 'Cartão de Débito',
      Icon: Bank,
    },
    {
      name: 'Dinheiro',
      Icon: Money,
    },
  ]

  return (
    <div className="space-y-8 rounded-md bg-gray-200 p-5 md:p-10">
      <div className="flex gap-2">
        <CurrencyDollar size={22} className="text-purple-500" />
        <div className="space-y-[2px]">
          <span>Pagamento</span>
          <p className="text-sm">
            O pagamento é feito na entrega. Escolha a forma que deseja pagar
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Controller
          control={control}
          name="payment"
          render={({ field }) => (
            <RadioGroup.Root
              className="flex w-full flex-col gap-3 md:flex-row"
              onValueChange={field.onChange}
              value={field.value}
            >
              {paymentOptions.map(({ name, Icon }) => (
                <RadioGroup.Item
                  key={name}
                  value={name}
                  data-error={!!errors.payment}
                  className="flex flex-1 items-center gap-3 rounded-md bg-gray-400 p-4 text-left text-xs uppercase text-gray-700 outline-double outline-1 outline-transparent transition-colors hover:bg-gray-500 focus:outline-yellow-500 data-[state=checked]:bg-purple-200 data-[state=checked]:outline-purple-500"
                >
                  <Icon size={16} className="text-purple-500" />
                  <span>{name}</span>
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          )}
        />
      </div>
    </div>
  )
}
