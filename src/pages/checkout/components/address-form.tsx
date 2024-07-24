import { MapPinLine } from '@phosphor-icons/react'
import Input from './input'
import { Controller, useFormContext } from 'react-hook-form'
import { AddressFormData } from '..'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SelectInput } from './select-input'

export function AddressForm() {
  const {
    register,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<AddressFormData>()
  const [statesUf, setStatesUf] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  async function getAddressOfCep(cep: string) {
    axios(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
      const { data } = response

      setValue('stateAbbreviation', data.uf, { shouldValidate: true })
      setValue('city', data.localidade, { shouldValidate: true })
      setValue('district', data.bairro, { shouldValidate: true })
      setValue('street', data.logradouro, { shouldValidate: true })
    })
  }

  useEffect(() => {
    axios(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`,
    ).then((response) => {
      const { data } = response
      const statesAbbreviation: string[] = data.map(
        (state: { sigla: string }) => state.sigla,
      )

      setStatesUf(statesAbbreviation)
    })
  }, [])

  const state = watch('stateAbbreviation')

  useEffect(() => {
    axios(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos?orderBy=nome`,
    ).then((response) => {
      const { data } = response
      const citiesName: string[] = data.map(
        (city: { nome: string }) => city.nome,
      )

      if (!citiesName.includes(getValues('city'))) {
        setValue('city', '')
      }

      setCities(citiesName)
    })
  }, [state, getValues, setValue])

  function formatCep(cep: string) {
    const cepNumber = cep.replace(/\D/g, '')

    if (cepNumber.length === 8) {
      getAddressOfCep(cepNumber)
    }

    if (cep.length > 5) {
      return cepNumber.replace(/(\d{5})(\d{1,3})/, '$1-$2')
    }

    return cepNumber
  }

  return (
    <div className="space-y-8 rounded-md bg-gray-200 p-5 md:p-10">
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
        <Controller
          control={control}
          name="cep"
          render={({ field }) => (
            <Input
              className="flex-1 md:w-52"
              type="text"
              labelContent="Cep"
              placeholder="CEP"
              maxLength={9}
              value={field.value}
              onChange={(e) => field.onChange(formatCep(e.target.value))}
              errorMessage={errors.cep?.message}
            />
          )}
        />

        <Input
          className="w-full"
          type="text"
          labelContent="Rua"
          placeholder="Rua"
          {...register('street')}
          errorMessage={errors.street?.message}
        />

        <div className="flex flex-wrap gap-4">
          <Input
            className="w-full md:w-52"
            type="text"
            labelContent="Numero da casa"
            placeholder="Número"
            {...register('numberOfHouse')}
            errorMessage={errors.numberOfHouse?.message}
          />
          <div className="relative flex-1">
            <Input
              className="w-full pr-16"
              type="text"
              labelContent="Complemento"
              placeholder="Complemento"
              {...register('complement')}
              errorMessage={errors.complement?.message}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs italic text-gray-600">
              Opcional
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <Input
            className="w-full md:w-52"
            type="text"
            labelContent="Bairro"
            placeholder="Bairro"
            {...register('district')}
            errorMessage={errors.district?.message}
          />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <SelectInput
                triggerClassName="md:w-full flex-1"
                placeholder="Cidade"
                list={cities}
                onChange={field.onChange}
                selectedItem={field.value}
                disabled={cities.length === 0}
                errorMessage={errors.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="stateAbbreviation"
            render={({ field }) => (
              <SelectInput
                placeholder="UF"
                list={statesUf}
                onChange={field.onChange}
                selectedItem={field.value}
                errorMessage={errors.stateAbbreviation?.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
