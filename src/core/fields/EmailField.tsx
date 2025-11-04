import type React from 'react'
import { Input, Label, cn } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'
import { useFieldConstraints } from '../schema/use-form-schema'

export type EmailFieldProps = {
  label: string
  hideLabel?: boolean
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  maxLength?: number
  pattern?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const widthClasses = {
  xs: 'w-20 !min-w-[5rem] !max-w-[5rem]',
  sm: 'w-32 !min-w-[8rem] !max-w-[8rem]',
  md: 'w-48 !min-w-[12rem] !max-w-[12rem]',
  lg: 'w-64 !min-w-[16rem] !max-w-[16rem]',
  xl: 'w-96 !min-w-[24rem] !max-w-[24rem]',
  full: 'w-full',
} as const

export const EmailField = ({
  label,
  hideLabel,
  width = 'full',
  required,
  maxLength: propMaxLength,
  pattern: propPattern,
  ...inputProps
}: EmailFieldProps) => {
  const field = useFieldContext<string>()
  const mode = useFormMode()
  const schemaConstraints = useFieldConstraints(field.name) as {
    maxLength?: number
    pattern?: string
  }
  const maxLength = propMaxLength ?? schemaConstraints.maxLength
  const pattern = propPattern ?? schemaConstraints.pattern

  if (mode === 'view') {
    return (
      <div className="space-y-2">
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
    )
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {!hideLabel && label && (
          <Label htmlFor={field.name}>
            {label}
            {required ? ' *' : ''}:
          </Label>
        )}
        <Input
          id={field.name}
          type="email"
          value={field.state.value ?? ''}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          disabled={mode === 'disabled'}
          className={cn(widthClasses[width])}
          maxLength={maxLength}
          pattern={pattern}
          required={required}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  )
}
