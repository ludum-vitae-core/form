import { useStore } from '@tanstack/react-form'
import { useFormContext } from '../form/form'
import { useFormMode } from '../../index'

function extractMessagesWithKeys(errorObj: unknown, parentKey = ''): { field: string; message: string }[] {
  if (!errorObj) return []
  if (typeof errorObj === 'string') return [{ field: parentKey, message: errorObj }]
  if (Array.isArray(errorObj)) {
    return errorObj.flatMap((item, idx) => extractMessagesWithKeys(item, parentKey ? `${parentKey}[${idx}]` : String(idx)))
  }
  if (typeof errorObj === 'object') {
    if ('message' in (errorObj as any) && typeof (errorObj as any).message === 'string') {
      return [{ field: parentKey, message: (errorObj as any).message }]
    }
    return Object.entries(errorObj as Record<string, unknown>).flatMap(([key, value]) => extractMessagesWithKeys(value, key))
  }
  return []
}

export function ErrorDisplay({ title = 'Please fix the following errors:', showBorder = true, className = '' }: { title?: string; showBorder?: boolean; className?: string }) {
  const form = useFormContext()
  const mode = useFormMode()

  const errors = useStore(form.store, (state) => state.errors)
  const errorList = extractMessagesWithKeys(errors)
  const filteredErrorList = errorList.filter(({ field }) => field && !/^\[?\d+\]?$/.test(field.trim()))
  const hasErrors = filteredErrorList.length > 0

  if (!hasErrors || mode === 'view') return null

  return (
    <div className={`${showBorder ? 'p-4 border border-red-300 bg-red-50 rounded-md' : ''} ${className}`}>
      <h3 className="text-red-700 font-medium mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1">
        {filteredErrorList.map(({ field, message }, idx) => (
          <li key={`${field}-${idx}-error`} className="text-red-600 text-sm">
            {(globalThis as any)?.process?.env?.NODE_ENV === 'development' && (
              <span className="font-semibold mr-1">{field && field !== 'root' ? `${field}:` : ''}</span>
            )}
            {message}
          </li>
        ))}
      </ul>
    </div>
  )
}
