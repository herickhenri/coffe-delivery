import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  labelContent?: string
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, labelContent, ...rest },
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
        {...rest}
        className={twMerge(
          'rounded border border-gray-400 bg-gray-300 p-3 placeholder:text-sm placeholder:text-gray-600',
          className,
        )}
      />
    </>
  )
})
