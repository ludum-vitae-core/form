import type { ReactNode } from 'react'
import type { z } from 'zod'
import { FormModeContext } from '../../index'
import { FormSchemaContext } from '../schema/schema-context'

interface FormProviderProps {
  schema: z.ZodTypeAny | null | undefined
  mode: 'view' | 'add' | 'edit' | 'disabled' | 'adminEdit'
  children: ReactNode
}

export function FormProvider({ schema, mode, children }: FormProviderProps) {
  return (
    <FormSchemaContext.Provider value={schema || null}>
      <FormModeContext.Provider value={mode}>{children}</FormModeContext.Provider>
    </FormSchemaContext.Provider>
  )
}
