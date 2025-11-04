import { Label } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type DateTimePickerFieldProps = {
  label: string
  hideLabel?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>

export const DateTimePickerField = ({ label, hideLabel, ...inputProps }: DateTimePickerFieldProps) => {
  const field = useFieldContext<string>()
  const mode = useFormMode()

  if (mode === 'view') {
    return (
      <div className="space-y-1">
        {!hideLabel && <Label htmlFor={field.name}>{label}:</Label>}
        <span className="text-sm">{field.state.value || 'N/A'}</span>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {!hideLabel && <Label htmlFor={field.name}>{label}:</Label>}
      <input
        id={field.name}
        type="datetime-local"
        value={field.state.value ?? ''}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        disabled={mode === 'disabled'}
        className="border rounded-md px-2 py-1"
        {...inputProps}
      />
      <FieldErrors meta={field.state.meta} />
    </div>
  )
}
