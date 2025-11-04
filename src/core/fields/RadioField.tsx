import { Label } from '../../adapters/ui'
import { useFieldContext } from '../form/form'
import { FieldErrors } from './FieldErrors'
import { useFormMode } from '../../index'

export type RadioOption = { value: string; label: string }

export type RadioFieldProps = {
  label: string
  options: RadioOption[]
  hideLabel?: boolean
  altErrorDisplay?: boolean
  horizontalMode?: boolean
}

export const RadioField = ({
  label,
  options,
  hideLabel = false,
  altErrorDisplay = false,
  horizontalMode = false,
}: RadioFieldProps) => {
  const field = useFieldContext<string>()
  const mode = useFormMode()

  if (mode === 'view') {
    return (
      <div className="space-y-2">
        <div className="grid gap-1.5 leading-none">
          {!hideLabel && label && <Label htmlFor={field.name}>{label}:</Label>}
          <span>{options.find((o) => o.value === field.state.value)?.label ?? field.state.value}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {!hideLabel && (
          <Label className="block text-sm font-medium mb-2" htmlFor={field.name}>
            {label}
          </Label>
        )}
        <div className={horizontalMode ? 'flex flex-row justify-evenly gap-4 w-full' : 'flex flex-col'}>
          {options && options.length > 0 ? (
            options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={field.state.value === option.value}
                  onChange={() => field.handleChange(option.value)}
                  onBlur={field.handleBlur}
                  disabled={mode === 'disabled'}
                />
                <span className={field.state.value === option.value ? 'font-medium' : 'font-normal'}>
                  {option.label}
                </span>
              </label>
            ))
          ) : (
            <div className="text-sm text-red-600 font-normal">No options found</div>
          )}
        </div>
      </div>
      {!altErrorDisplay && <FieldErrors meta={field.state.meta} />}
    </div>
  )
}
