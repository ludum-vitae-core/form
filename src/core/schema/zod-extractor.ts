import type { z } from 'zod'

export type InputConstraints = {
  maxLength?: number
  minLength?: number
  pattern?: string
}

function extractFromZodString(zodString: any): InputConstraints {
  const res: InputConstraints = {}
  const checks: Array<any> = zodString?._def?.checks ?? []
  for (const c of checks) {
    if (c.kind === 'min') res.minLength = typeof c.value === 'number' ? c.value : res.minLength
    if (c.kind === 'max') res.maxLength = typeof c.value === 'number' ? c.value : res.maxLength
    if (c.kind === 'regex' && c.regex) res.pattern = c.regex.source
  }
  return res
}

function unwrapOptionalNullable(type: any): any {
  let t = type
  while (t?._def?.typeName === 'ZodOptional' || t?._def?.typeName === 'ZodNullable' || t?._def?.typeName === 'ZodDefault') {
    t = t?._def?.innerType ?? t?._def?.type
  }
  return t
}

export function getInputAttributesFromSchema(schema: z.ZodTypeAny, fieldName: string): InputConstraints {
  try {
    const base = unwrapOptionalNullable(schema) as any
    if (base?._def?.typeName === 'ZodObject') {
      const shape = typeof base.shape === 'function' ? base.shape() : base._def?.shape()
      const field = shape?.[fieldName]
      if (!field) return {}
      const unwrapped = unwrapOptionalNullable(field)
      if (unwrapped?._def?.typeName === 'ZodString') {
        return extractFromZodString(unwrapped)
      }
      return {}
    }
    return {}
  } catch {
    return {}
  }
}
