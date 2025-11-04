import type { AnyFieldMeta } from '@tanstack/react-form'
import type { ZodError } from 'zod'

export function FieldErrors({ meta }: { meta: AnyFieldMeta }) {
  if (!meta.isTouched) return null
  if (meta.errors.length === 0) return null
  return (
    <div className="text-right">
      {meta.errors.map(({ message }: ZodError, index) => (
        <p key={index + message} className="text-xs font-medium text-red-600 whitespace-nowrap">
          {message}
        </p>
      ))}
    </div>
  )
}
