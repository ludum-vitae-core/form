import type React from 'react'
import { Input, Label, cn } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type PasswordFieldProps = {
  label: string
  hideLabel?: boolean
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const widthClasses = {
  xs: 'w-20 !min-w-[5rem] !max-w-[5rem]',
  sm: 'w-32 !min-w-[8rem] !max-w-[8rem]',
  md: 'w-48 !min-w-[12rem] !max-w-[12rem]',
  lg: 'w-64 !min-w-[16rem] !max-w-[16rem]',
  xl: 'w-96 !min-w-[24rem] !max-w-[24rem]',
  full: 'w-full',
} as const

export const PasswordField = ({ label, hideLabel, width = 'full', ...inputProps }: PasswordFieldProps) => {
  const field = useFieldContext<string>()
  const mode = useFormMode()

  if (mode === 'view') {
    return (
      <div className="space-y-2">
        {!hideLabel && label && <Label htmlFor={field.name}>{label}:</Label>}
        <span className="text-sm">••••••••</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {!hideLabel && label && <Label htmlFor={field.name}>{label}:</Label>}
      <Input
        id={field.name}
        type="password"
        value={field.state.value ?? ''}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        disabled={mode === 'disabled'}
        className={cn(widthClasses[width])}
        {...inputProps}
      />
      <FieldErrors meta={field.state.meta} />
    </div>
  )
}
