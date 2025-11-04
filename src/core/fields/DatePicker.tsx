import { Label } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type DatePickerProps = {
  label: string
  hideLabel?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>

export const DatePicker = ({ label, hideLabel, ...inputProps }: DatePickerProps) => {
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
        type="date"
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
