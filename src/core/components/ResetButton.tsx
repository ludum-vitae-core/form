import { Button } from '../../adapters/ui'
import { useStore } from '@tanstack/react-form'
import { useFormContext } from '../form/form'
import { useFormMode } from '../../index'

export function ResetButton({ children, onReset }: { children: React.ReactNode; onReset?: () => void }) {
  const form = useFormContext()
  const mode = useFormMode()
  const [isSubmitting] = useStore(form.store, (state) => [state.isSubmitting])

  const handleReset = () => {
    if (onReset) onReset()
    else form.reset()
  }

  return (
    <Button type="reset" disabled={isSubmitting || mode === 'disabled'} onClick={handleReset}>
      {children}
    </Button>
  )
}
