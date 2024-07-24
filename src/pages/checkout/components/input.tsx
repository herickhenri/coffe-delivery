import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  labelContent?: string
  errorMessage?: string
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, labelContent, errorMessage, ...rest },
  ref,
) {
  return (
    <>
      <label htmlFor={labelContent} className="sr-only">
        {labelContent}
      </label>
      <input
        id={labelContent}
        ref={ref}
        data-error={!!errorMessage}
        {...rest}
        className={twMerge(
          'rounded border border-gray-400 bg-gray-300 p-3 outline-double outline-1 outline-transparent placeholder:text-sm placeholder:text-gray-600 focus:outline-yellow-500 data-[error=true]:outline-red-400',
          className,
        )}
      />
    </>
  )
})
