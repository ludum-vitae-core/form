import { useFieldContext } from '../form/form'
import { useFieldConstraints } from '../schema/use-form-schema'

export function LengthCounter() {
  const field = useFieldContext<string>()
  const constraints = useFieldConstraints(field.name) as { maxLength?: number }
  const value = field.state.value ?? ''
  const max = constraints.maxLength
  if (!max) return null
  return (
    <span className="text-xs text-muted-foreground">{value.length}/{max}</span>
  )
}
