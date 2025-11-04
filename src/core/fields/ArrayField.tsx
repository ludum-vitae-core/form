import { Button, Label, cn } from '../../adapters/ui'
import type React from 'react'
import { useFieldContext } from '../form/form'
import { useFormMode } from '../../index'
import { TextField } from './TextField'

export type ArrayFieldProps = {
  label: string
  hideLabel?: boolean
  addButtonText?: string
  itemLabel?: string
} & React.HTMLAttributes<HTMLDivElement>

export const ArrayField = ({ label, hideLabel, addButtonText, itemLabel, className, ...divProps }: ArrayFieldProps) => {
  const field = useFieldContext<string[]>()
  const mode = useFormMode()

  return (
    <div className={cn('space-y-2', className)} {...divProps}>
      <div className="relative">
        <div className="space-y-1">
          {!hideLabel && <Label htmlFor={field.name}>{label}:</Label>}
          {field.state.value ? (
            <div className="mt-0">
              {field.state.value.map((_, index) => (
                <div key={`${field.name}-${index}`} className="flex gap-2 my-0 mb-2">
                  <TextField
                    label={itemLabel ? `${itemLabel} ${index + 1}` : `${label} ${index + 1}`}
                    autoFocus
                    hideLabel={true}
                    value={field.state.value[index] ?? ''}
                    onChange={(e) => {
                      const newValues = [...field.state.value]
                      newValues[index] = e.target.value
                      field.handleChange(newValues)
                    }}
                    onBlur={field.handleBlur}
                    disabled={mode === 'disabled'}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newValues = [...field.state.value]
                      newValues.splice(index, 1)
                      field.handleChange(newValues)
                    }}
                    className="px-2 self-center"
                    disabled={mode === 'disabled'}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  field.handleChange([...(field.state.value || []), ''])
                }}
                disabled={mode === 'disabled'}
              >
                {addButtonText || `Add row to ${label}`}
              </Button>
            </div>
          ) : (
            <div className="mt-1">No items</div>
          )}
        </div>
      </div>
    </div>
  )
}
