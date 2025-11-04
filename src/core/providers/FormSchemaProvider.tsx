import type { ReactNode } from 'react'
import type { z } from 'zod'
import { FormSchemaContext } from '../schema/schema-context'

interface FormSchemaProviderProps {
  schema: z.ZodTypeAny | null | undefined
  children: ReactNode
}

export function FormSchemaProvider({ schema, children }: FormSchemaProviderProps) {
  return <FormSchemaContext.Provider value={schema || null}>{children}</FormSchemaContext.Provider>
}
