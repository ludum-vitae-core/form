import * as React from 'react'

export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn('block w-full rounded-md border px-2 py-1', className)} {...props} />
  }
)

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn('block w-full rounded-md border px-2 py-1', className)} {...props} />
  }
)

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label className={cn('text-sm font-medium leading-none', className)} {...props} />
)

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Checkbox({ className, ...props }, ref) {
    return <input ref={ref} type="checkbox" className={cn('h-4 w-4', className)} {...props} />
  }
)

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button({ className, ...props }, ref) {
    return <button ref={ref} className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-md border', className)} {...props} />
  }
)
