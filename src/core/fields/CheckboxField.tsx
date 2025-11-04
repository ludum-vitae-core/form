import { Checkbox, Label } from '../../adapters/ui'
import { useEffect } from 'react'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type CheckboxFieldProps = {
  label: string
  description?: string
  hideLabel?: boolean
}

export const CheckboxField = ({ label, description, hideLabel = false }: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>()
  const mode = useFormMode()

  useEffect(() => {
    if (typeof field.state.value === 'string') {
      field.handleChange(field.state.value !== 'false')
    } else if (field.state.value === undefined) {
      field.handleChange(false)
    }
  }, [])

  if (mode === 'view') {
    const isChecked =
      typeof field.state.value === 'string' ? field.state.value !== 'false' : Boolean(field.state.value)

    return (
      <div className="space-y-2">
        <div className="items-top flex space-x-2">
          <Checkbox id={field.name} checked={isChecked} disabled={true} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor={field.name} className="text-sm font-medium leading-none">
              {label}
            </Label>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="items-top flex space-x-2">
        <Checkbox
          id={field.name}
          checked={Boolean(field.state.value)}
          onChange={(e) => field.handleChange(Boolean(e.target.checked))}
          onBlur={field.handleBlur}
          disabled={mode === 'disabled'}
        />
        {!hideLabel && (
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor={field.name} className="text-sm font-medium leading-none cursor-pointer">
              {label}
            </Label>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  )
}
