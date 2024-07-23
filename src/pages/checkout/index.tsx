import { FormProvider, useForm } from 'react-hook-form'
import { AddressForm } from './components/address-form'
import { ResumeCoffees } from './components/order-confirmation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { CoffeesContext } from '../../contexts/coffees-context'

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
          <ResumeCoffees />
        </div>
      </form>
    </FormProvider>
  )
}
