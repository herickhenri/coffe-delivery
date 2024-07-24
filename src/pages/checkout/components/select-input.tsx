import { CaretDown } from '@phosphor-icons/react'
import * as Select from '@radix-ui/react-select'
import { twMerge } from 'tailwind-merge'

interface SelectInputProps {
  list: string[]
  onChange: (item: string) => void
  selectedItem: string
  placeholder: string
  disabled?: boolean
  triggerClassName?: string
}

export function SelectInput({
  list,
  onChange,
  selectedItem,
  placeholder,
  disabled = false,
  triggerClassName,
}: SelectInputProps) {
  return (
    <Select.Root
      onValueChange={onChange}
      value={selectedItem}
      disabled={disabled}
    >
      <Select.Trigger
        className={twMerge(
          'flex items-center justify-between gap-2 rounded border border-gray-400 bg-gray-300 p-3 outline-double outline-1 outline-transparent focus:outline-yellow-500 data-[placeholder]:text-sm data-[placeholder]:text-gray-600 data-[error=true]:outline-red-400',
          triggerClassName,
        )}
      >
        <Select.Value
          placeholder={placeholder}
          className="p-1 data-[placeholder]:text-gray-300"
        />
        <Select.Icon>
          <CaretDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content
        className="h-36 cursor-pointer overflow-y-auto rounded bg-purple-200 text-center"
        side="bottom"
        position="popper"
        align="center"
        sideOffset={4}
      >
        <Select.Viewport>
          {list.map((item) => (
            <Select.Item
              key={item}
              value={item}
              className="rounded px-4 py-1 outline-none transition-colors duration-75 hover:bg-purple-500 hover:text-white"
            >
              <Select.ItemText>{item}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
