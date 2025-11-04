import { Button } from '../../adapters/ui'
import { useStore } from '@tanstack/react-form'
import { useFormContext } from '../form/form'

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const form = useFormContext()
  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [state.isSubmitting, state.canSubmit])

  return (
    <Button type="submit" disabled={isSubmitting}>
      <>
        {children || (canSubmit ? 'Submit' : 'Please fix the errors')}
      </>
    </Button>
  )
}
