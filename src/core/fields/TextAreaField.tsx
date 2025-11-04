import type React from 'react'
import { Label, Textarea } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'
import { useFieldConstraints } from '../schema/use-form-schema'

export type TextAreaFieldProps = {
  label: string
  hideLabel?: boolean
  maxLength?: number
  minLength?: number
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextAreaField = ({
  label,
  rows = 4,
  hideLabel,
  maxLength: propMaxLength,
  minLength: propMinLength,
  ...inputProps
}: TextAreaFieldProps) => {
  const field = useFieldContext<string>()
  const mode = useFormMode()
  const schemaConstraints = useFieldConstraints(field.name) as {
    maxLength?: number
    minLength?: number
  }
  const maxLength = propMaxLength ?? schemaConstraints.maxLength
  const minLength = propMinLength ?? schemaConstraints.minLength

  if (mode === 'view') {
    if (!field.state.value && hideLabel) return null
    if (!field.state.value) {
      return (
        <div className="space-y-2">
          <div className="text-sm">
            {!hideLabel && label && (
              <Label htmlFor={field.name}>
                {label}: <span className="font-normal">N/A</span>
              </Label>
            )}
          </div>
        </div>
      )
    }
    return (
      <div className="space-y-1">
        {!hideLabel && label && <Label htmlFor={field.name}>{label}:</Label>}
        <span className="text-sm">{field.state.value || 'N/A'}</span>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div className="space-y-1">
        {!hideLabel && label && <Label htmlFor={field.name}>{label}:</Label>}
        <Textarea
          id={field.name}
          disabled={mode === 'disabled'}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          rows={rows}
          maxLength={maxLength}
          minLength={minLength}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  )
}
