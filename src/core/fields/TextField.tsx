import type React from 'react'
import { Input, Label, cn } from '../../adapters/ui'
import { FieldErrors } from './FieldErrors'
import { useFieldContext } from '../form/form'
import { useFormMode } from '../../index'
import { useFieldConstraints } from '../schema/use-form-schema'

export type TextFieldProps = {
  label: string
  hideLabel?: boolean
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  maxLength?: number
  minLength?: number
  pattern?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const widthClasses = {
  xs: 'w-20 !min-w-[5rem] !max-w-[5rem]',
  sm: 'w-32 !min-w-[8rem] !max-w-[8rem]',
  md: 'w-48 !min-w-[12rem] !max-w-[12rem]',
  lg: 'w-64 !min-w-[16rem] !max-w-[16rem]',
  xl: 'w-96 !min-w-[24rem] !max-w-[24rem]',
  full: 'w-full',
} as const

export const TextField = ({
  label,
  hideLabel,
  width = 'full',
  readOnly,
  required,
  maxLength: propMaxLength,
  minLength: propMinLength,
  pattern: propPattern,
  ...inputProps
}: TextFieldProps) => {
  const field = useFieldContext<string>()
  const hasErrors = field.state.meta.isTouched && field.state.meta.errors.length > 0
  const mode = useFormMode()
  const schemaConstraints = useFieldConstraints(field.name) as {
    maxLength?: number
    minLength?: number
    pattern?: string
  }
  const maxLength = propMaxLength ?? schemaConstraints.maxLength
  const minLength = propMinLength ?? schemaConstraints.minLength
  const pattern = propPattern ?? schemaConstraints.pattern

  if (mode === 'view') {
    return (
      <div className="space-y-2">
        <div className="relative">
          <div className="space-y-1">
            {!hideLabel && label && (
              <Label htmlFor={field.name}>
                {label}
                {required ? ' *' : ''}:
              </Label>
            )}
            <span>{field.state.value}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="space-y-1">
          {!hideLabel && label && (
            <Label htmlFor={field.name}>
              {label}
              {required ? ' *' : ''}:
            </Label>
          )}
          <Input
            id={field.name}
            disabled={mode === 'disabled'}
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            className={cn(widthClasses[width], hasErrors && 'border-red-600 ring-red-600 ring-[1px]')}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            required={required}
            {...inputProps}
          />
        </div>
        <div className="absolute right-0 mt-1">
          <FieldErrors meta={field.state.meta} />
        </div>
      </div>
    </div>
  )
}
