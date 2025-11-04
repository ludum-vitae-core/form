import type React from 'react'
import { Input, Label, cn } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type NumberFieldProps = {
  label: string
  hideLabel?: boolean
  min?: number
  max?: number
  step?: number
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'min' | 'max' | 'step'>

const widthClasses = {
  xs: 'w-20 !min-w-[5rem] !max-w-[5rem]',
  sm: 'w-32 !min-w-[8rem] !max-w-[8rem]',
  md: 'w-48 !min-w-[12rem] !max-w-[12rem]',
  lg: 'w-64 !min-w-[16rem] !max-w-[16rem]',
  xl: 'w-96 !min-w-[24rem] !max-w-[24rem]',
  full: 'w-full',
} as const

export const NumberField = ({
  label,
  hideLabel,
  min,
  max,
  step = 1,
  width = 'full',
  ...inputProps
}: NumberFieldProps) => {
  const field = useFieldContext<number | undefined>()
  const mode = useFormMode()

  const hasErrors = field.state.meta.isTouched && field.state.meta.errors.length > 0

  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.-]/g, '')
    if (numericValue === '') {
      field.handleChange(undefined)
      return
    }
    const numValue = Number.parseFloat(numericValue)
    if (!Number.isNaN(numValue)) {
      if (min !== undefined && numValue < min) {
        field.handleChange(min)
        return
      }
      if (max !== undefined && numValue > max) {
        field.handleChange(max)
        return
      }
      field.handleChange(numValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '-', '.', 'Enter']
    if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
      e.preventDefault()
    }
    if (e.key === '.' && e.currentTarget.value.includes('.')) {
      e.preventDefault()
    }
    if (e.key === '-' && e.currentTarget.selectionStart !== 0) {
      e.preventDefault()
    }
  }

  const formattedValue = field.state.value?.toLocaleString() ?? ''

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="space-y-1">
          {!hideLabel && <Label htmlFor={field.name}>{label}:</Label>}
          {mode === 'view' ? (
            <div className={cn('py-1.5 px-3 rounded-md border border-transparent', widthClasses[width])}>
              {formattedValue}
            </div>
          ) : (
            <Input
              id={field.name}
              type="text"
              inputMode="numeric"
              value={field.state.value?.toString() ?? ''}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={field.handleBlur}
              disabled={mode === 'disabled'}
              className={cn(widthClasses[width], hasErrors && 'border-red-600 ring-red-600 ring-[1px]')}
              {...inputProps}
            />
          )}
        </div>
        {mode !== 'view' && (
          <div className="absolute right-0 mt-1">
            <FieldErrors meta={field.state.meta} />
          </div>
        )}
      </div>
    </div>
  )
}
