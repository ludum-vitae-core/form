import { createContext, useContext } from 'react'
import type { z } from 'zod'

export const FormSchemaContext = createContext<z.ZodTypeAny | null>(null)

export function useFormSchemaContext() {
  return useContext(FormSchemaContext)
}
