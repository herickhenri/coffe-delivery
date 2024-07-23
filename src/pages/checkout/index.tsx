import { FormProvider, useForm } from 'react-hook-form'
import { AddressForm } from './components/address-form'
import { ResumeCoffees } from './components/resume-coffees'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { CoffeesContext } from '../../contexts/coffees-context'
import { Link } from 'react-router-dom'

const AddressFormSchema = z.object({
  cep: z.string().refine((cepValue) => {
    const cepRegex = /^\d{5}-\d{3}$/
    return cepRegex.test(cepValue)
  }),
  street: z.string(),
  numberOfHouse: z.number(),
  complement: z.string().optional(),
  district: z.string(),
  city: z.string(),
  stateAbbreviation: z.string().max(2),
  payment: z.string(),
})

export type AddressFormData = z.infer<typeof AddressFormSchema>

export function Checkout() {
  const { coffeeShoppingList } = useContext(CoffeesContext)

  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(AddressFormSchema),
  })

  const { handleSubmit } = addressForm

  function handleCreateOrder(data: AddressFormData) {
    console.log(data)
  }

  return (
    <FormProvider {...addressForm}>
      <form
        className="flex gap-8 px-40 py-10"
        onSubmit={handleSubmit(handleCreateOrder)}
      >
        <div className="flex-1 space-y-4">
          <strong className="font-baloo-2 text-lg font-bold text-gray-800">
            Complete seu pedido
          </strong>
          <AddressForm />
        </div>
        <div className="min-w-[28rem] space-y-4">
          <strong className="font-baloo-2 text-lg font-bold text-gray-800">
            Cafés selecionados
          </strong>
          <div className="space-y-6 rounded-bl-[44px] rounded-br-md rounded-tl-md rounded-tr-[44px] bg-gray-200 p-10">
            {coffeeShoppingList.length <= 0 ? (
              <div className="flex flex-col gap-4 text-center">
                <span className="">
                  Nenhum café selecionado. Escolha um de nossos produtos na
                  página principal
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
                <ResumeCoffees />

                <button
                  className="w-full rounded-md bg-yellow-500 px-2 py-3 text-sm font-bold text-white transition-colors hover:bg-yellow-700"
                  type="submit"
                >
                  CONFIRMAR PEDIDO
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
