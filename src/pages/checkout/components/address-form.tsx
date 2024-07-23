import * as RadioGroup from '@radix-ui/react-radio-group'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from '@phosphor-icons/react'
import Input from './input'
import { Controller, useFormContext } from 'react-hook-form'
import { AddressFormData } from '..'

export function AddressForm() {
  const { register, control } = useFormContext<AddressFormData>()

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
    <>
      <div className="space-y-8 rounded-md bg-gray-200 p-10">
        <div className="flex gap-2">
          <MapPinLine size={22} className="text-yellow-700" />
          <div className="space-y-[2px]">
            <span>Endereço de Entrega</span>
            <p className="text-sm">
              Informe o endereço onde deseja receber seu pedido
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            className="w-52"
            type="text"
            labelContent="Cep"
            placeholder="CEP"
            {...register('cep')}
          />

          <Input
            className="w-full"
            type="text"
            labelContent="Rua"
            placeholder="Rua"
            {...register('street')}
          />

          <div className="flex gap-4">
            <Input
              className="w-52"
              type="text"
              labelContent="Numero da casa"
              placeholder="Número"
              {...register('numberOfHouse', { valueAsNumber: true })}
            />
            <Input
              className="flex-1"
              type="text"
              labelContent="Complemento"
              placeholder="Complemento"
              {...register('complement')}
            />
            <span className="text-xs italic text-gray-600">Opcional</span>
          </div>

          <div className="flex gap-4">
            <Input
              className="w-52"
              type="text"
              labelContent="Bairro"
              placeholder="Bairro"
              {...register('district')}
            />
            <Input
              className="flex-1"
              type="text"
              labelContent="Cidade"
              placeholder="Cidade"
              {...register('city')}
            />
            <Input
              className="w-14"
              labelContent="Sigla do estado"
              type="text"
              placeholder="UF"
              {...register('stateAbbreviation')}
            />
          </div>
        </div>
      </div>

      <div className="space-y-8 rounded-md bg-gray-200 p-10">
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
                className="flex gap-3"
                onValueChange={field.onChange}
                value={field.value}
              >
                {paymentOptions.map(({ name, Icon }) => (
                  <RadioGroup.Item
                    key={name}
                    value={name}
                    className="flex items-center gap-3 rounded-md border border-transparent bg-gray-400 p-4 text-left text-xs uppercase text-gray-700 transition-colors hover:bg-gray-500 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-200"
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
    </>
  )
}
