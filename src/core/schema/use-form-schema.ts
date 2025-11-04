import { useMemo } from 'react'
import type { z } from 'zod'
import { useFormSchemaContext } from './schema-context'
import { getInputAttributesFromSchema } from './zod-extractor'

export function useFormSchema(): z.ZodTypeAny | null {
  return useFormSchemaContext()
}

export function useFieldConstraints(fieldName: string): Record<string, unknown> {
  const schema = useFormSchema()
  return useMemo(() => {
    if (!schema || !fieldName) return {}
    return getInputAttributesFromSchema(schema, fieldName)
  }, [schema, fieldName])
}
