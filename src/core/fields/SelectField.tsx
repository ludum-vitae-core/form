import { Label, cn } from '../../adapters/ui'
import { useEffect } from 'react'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type SelectOption = { value: string; label: string }

export type SelectFieldProps = {
  label: string
  options: SelectOption[]
  placeholder?: string
  hideLabel?: boolean
  disabled?: boolean
  allowBlankOption?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const SelectField = ({
  label,
  options,
  placeholder,
  hideLabel = false,
  disabled = false,
  allowBlankOption = false,
  className,
  ...inputProps
}: SelectFieldProps) => {
  const field = useFieldContext<string>()

  useEffect(() => {
    if (options.length > 0 && (!field.state.value || field.state.value === '') && !allowBlankOption) {
      setTimeout(() => {
        field.handleChange(options[0].value)
      }, 0)
    }
  }, [field, options, allowBlankOption])

  const mode = useFormMode()
  const hasErrors = field.state.meta.isTouched && field.state.meta.errors.length > 0

  if (mode === 'view') {
    return (
      <div className="space-y-2">
        <div className="grid gap-1.5 leading-none">
          {!hideLabel && <Label htmlFor={field.name}>{label}:</Label>}
          <span>{options.find((o) => o.value === field.state.value)?.label ?? field.state.value}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {!hideLabel && <Label htmlFor={field.name}>{label}:</Label>}
        <select
          id={field.name}
          value={field.state.value ?? (allowBlankOption ? '' : options[0]?.value)}
          onChange={(e) => {
            field.handleChange(e.target.value)
            field.handleBlur()
          }}
          onBlur={field.handleBlur}
          disabled={mode === 'disabled' || disabled}
          className={cn('w-full border rounded-md px-2 py-1', hasErrors && 'border-red-600 ring-red-600 ring-[1px]', className)}
          {...inputProps}
        >
          {allowBlankOption && (
            <option value="">{placeholder || 'Select an option...'}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  )
}
