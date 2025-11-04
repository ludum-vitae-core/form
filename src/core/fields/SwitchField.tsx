import { Label, Checkbox } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type SwitchFieldProps = {
  label: string
  description?: string
  hideLabel?: boolean
}

export const SwitchField = ({ label, description, hideLabel = false }: SwitchFieldProps) => {
  const field = useFieldContext<boolean>()
  const mode = useFormMode()

  if (mode === 'view') {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor={field.name} className="cursor-pointer">
              {label}
            </Label>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <span>{field.state.value ? 'Yes' : 'No'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={Boolean(field.state.value)}
          onChange={(e) => field.handleChange(Boolean(e.target.checked))}
          onBlur={field.handleBlur}
          disabled={mode === 'disabled'}
        />
        <div className="grid gap-1.5 leading-none">
          {!hideLabel && (
            <Label htmlFor={field.name} className="cursor-pointer">
              {label}
            </Label>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  )
}
