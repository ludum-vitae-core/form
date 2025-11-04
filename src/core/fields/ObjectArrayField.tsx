import { Button, Label, cn } from '../../adapters/ui'
import type React from 'react'
import { useFieldContext } from '../form/form'
import { TextField } from './TextField'

export type ObjectArrayFieldProps = {
  label: string
  hideLabel?: boolean
  addButtonText?: string
  fields?: Array<{ key: string; label: string; placeholder?: string }>
} & React.HTMLAttributes<HTMLDivElement>

export const ObjectArrayField = ({
  label,
  hideLabel,
  addButtonText,
  fields = [
    { key: 'name', label: 'Name', placeholder: 'Enter name' },
    { key: 'value', label: 'Value', placeholder: 'Enter value' },
  ],
  className,
  ...divProps
}: ObjectArrayFieldProps) => {
  const field = useFieldContext<Record<string, string>[]>()

  const handleChange = (newValues: Record<string, string>[]) => {
    field.handleChange(newValues)
  }

  const handleBlur = () => {
    if (!field.state.value) return
    const lastIndex = field.state.value.length - 1
    const processedValues = field.state.value.map((item, index) => {
      const nameValue = item[fields[0].key]?.trim() || ''
      const valueValue = item[fields[1].key]?.trim() || ''
      if (valueValue && !nameValue) {
        return { ...item, [fields[0].key]: `Item ${index + 1}` }
      }
      return item
    })
    const filteredValues = processedValues.filter((item, index) => {
      if (index === lastIndex) return true
      return fields.some((cfg) => {
        const value = item[cfg.key]
        return value && value.trim() !== ''
      })
    })
    if (JSON.stringify(filteredValues) !== JSON.stringify(field.state.value)) {
      field.handleChange(filteredValues)
    }
    field.handleBlur()
  }

  return (
    <div className={cn('space-y-2', className)} {...divProps}>
      <div className="relative">
        <div className="space-y-1">
          {!hideLabel && <Label htmlFor={field.name}>{label}:</Label>}
          {field.state.value ? (
            <div className="mt-0">
              {field.state.value.map((item, index) => (
                <div key={`${field.name}-${index}`} className="relative my-4 p-3 pt-2 border rounded-md bg-gray-50">
                  <div className="flex flex-wrap gap-4">
                    <div className="w-[120px] flex-shrink-0">
                      <TextField
                        label={`${fields[0].label}${item[fields[1].key]?.trim() ? ' *' : ''}`}
                        placeholder={fields[0].placeholder}
                        width="sm"
                        autoFocus={index === field.state.value.length - 1}
                        value={item[fields[0].key] ?? ''}
                        onChange={(e) => {
                          const newValues = [...field.state.value]
                          newValues[index] = { ...newValues[index], [fields[0].key]: e.target.value }
                          handleChange(newValues)
                        }}
                        onBlur={handleBlur}
                      />
                      {item[fields[1].key]?.trim() && !item[fields[0].key]?.trim() && (
                        <div className="absolute -inset-[1px] pointer-events-none border border-red-500 rounded-md" />
                      )}
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <TextField
                            label={fields[1].label}
                            placeholder={fields[1].placeholder}
                            width="full"
                            value={item[fields[1].key] ?? ''}
                            onChange={(e) => {
                              const newValues = [...field.state.value]
                              newValues[index] = { ...newValues[index], [fields[1].key]: e.target.value }
                              handleChange(newValues)
                            }}
                            onBlur={handleBlur}
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            const newValues = [...field.state.value]
                            newValues.splice(index, 1)
                            handleChange(newValues)
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const emptyItem = fields.reduce((acc, f) => {
                    acc[f.key] = ''
                    return acc
                  }, {} as Record<string, string>)
                  handleChange([...(field.state.value || []), emptyItem])
                }}
                className="mt-2"
              >
                {addButtonText || `Add item to ${label}`}
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
