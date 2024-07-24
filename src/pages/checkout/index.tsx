import { FormProvider, useForm } from 'react-hook-form'
import { AddressForm } from './components/address-form'
import { ResumeCoffees } from './components/resume-coffees'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { CoffeesContext } from '../../contexts/coffees-context'
import { Link, useNavigate } from 'react-router-dom'
import { PaymentMethod } from './components/payment-method'

const AddressFormSchema = z.object({
  cep: z.string({ message: 'O cep é obrigatório' }).refine((cepValue) => {
    const cepRegex = /^\d{5}-\d{3}$/
    return cepRegex.test(cepValue)
  }, 'Formato Inválido'),
  street: z.string().min(3, 'O nome da rua é obrigatório.'),
  numberOfHouse: z.coerce.number().min(1, 'O numero da casa é obrigatório.'),
  complement: z.string().optional(),
  district: z.string().min(3, 'O nome do bairro é obrigatório.'),
  city: z.string().min(3, 'O nome da cidade é obrigatório.'),
  stateAbbreviation: z
    .string({ message: 'A sigla do estado é obrigatória' })
    .length(2),
  payment: z.string({ message: 'Informe o tipo de pagamento' }),
})

export type AddressFormData = z.infer<typeof AddressFormSchema>

export function Checkout() {
  const navigate = useNavigate()
  const { coffeeShoppingList, changeAddressData, addressData } =
    useContext(CoffeesContext)

  console.log('executei')

  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      cep: addressData.cep,
    },
  })

  const { handleSubmit } = addressForm

  function handleCreateOrder(data: AddressFormData) {
    changeAddressData(data)
    navigate('/checkout-success')
  }

  return (
    <FormProvider {...addressForm}>
      <form
        className="flex flex-col gap-8 px-10 py-10 md:flex-row md:px-40"
        onSubmit={handleSubmit(handleCreateOrder)}
      >
        <div className="w-full flex-1 space-y-4 md:min-w-[40rem]">
          <strong className="font-baloo-2 text-lg font-bold text-gray-800">
            Complete seu pedido
          </strong>
          <AddressForm />
          <PaymentMethod />
        </div>
        <div className="space-y-4 md:min-w-[28rem]">
          <strong className="font-baloo-2 text-lg font-bold text-gray-800">
            Cafés selecionados
          </strong>
          <div className="space-y-6 rounded-bl-[44px] rounded-br-md rounded-tl-md rounded-tr-[44px] bg-gray-200 p-5 md:p-10">
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
