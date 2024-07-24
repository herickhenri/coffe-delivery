import { createContext, ReactNode, useState } from 'react'
import { Coffee } from '../types/Coffee'

type CoffeeShopping = {
  coffee: Coffee
  amount: number
}

type AddressData = {
  cep: string
  street: string
  numberOfHouse: number
  district: string
  city: string
  stateAbbreviation: string
  payment: string
  complement?: string | undefined
}

type CyclesContextType = {
  coffeeShoppingList: CoffeeShopping[]
  addressData: AddressData
  changeAddressData: (data: AddressData) => void
  addOneCoffeeInShoppingList: (coffee: Coffee) => void
  removeOneCoffeeInShoppingList: (coffee: Coffee) => void
  removeAllAmountCoffeInShoppingList: (coffee: Coffee) => void
}

export const CoffeesContext = createContext({} as CyclesContextType)

interface CoffeesContextProviderProps {
  children: ReactNode
}

export function CoffeesContextProvider({
  children,
}: CoffeesContextProviderProps) {
  const [coffeeShoppingList, setCoffeeShoppingList] = useState<
    CoffeeShopping[]
  >([])
  const [addressData, setAddressData] = useState<AddressData>({} as AddressData)

  function changeAddressData(data: AddressData) {
    setAddressData(data)
  }

  function addOneCoffeeInShoppingList(coffee: Coffee) {
    setCoffeeShoppingList((state) => {
      const coffeeAlreadyExists = !!state.find(
        (state) => state.coffee.id === coffee.id,
      )
      if (coffeeAlreadyExists) {
        return state.map((state) =>
          coffee.id === state.coffee.id
            ? { coffee: state.coffee, amount: state.amount + 1 }
            : state,
        )
      }

      return [...state, { coffee, amount: 1 }]
    })
  }

  function removeOneCoffeeInShoppingList(coffee: Coffee) {
    setCoffeeShoppingList((state) => {
      const coffeeFind = state.find((state) => state.coffee.id === coffee.id)

      if (!coffeeFind) {
        return state
      }

      if (coffeeFind.amount <= 1) {
        return state.filter((state) => state.coffee.id !== coffee.id)
      }

      return state.map((state) =>
        state.coffee.id === coffee.id
          ? { coffee: state.coffee, amount: state.amount - 1 }
          : state,
      )
    })
  }

  function removeAllAmountCoffeInShoppingList(coffee: Coffee) {
    setCoffeeShoppingList((state) =>
      state.filter((state) => state.coffee !== coffee),
    )
  }

  return (
    <CoffeesContext.Provider
      value={{
        coffeeShoppingList,
        addOneCoffeeInShoppingList,
        removeOneCoffeeInShoppingList,
        removeAllAmountCoffeInShoppingList,
        addressData,
        changeAddressData,
      }}
    >
      {children}
    </CoffeesContext.Provider>
  )
}
