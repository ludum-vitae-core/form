'use client'
import React, { useEffect, useState } from 'react'
import { useFieldContext } from '@ludumvitae/form'

export type EntityOption = { value: string; label: string }
export type EntitySelectAdapter<TParams = unknown> = { loadOptions: (params?: TParams) => Promise<EntityOption[]>; getLabel?: (value: string) => Promise<string | null> }

export function EmployeeSelectField({ label, adapter, params, placeholder = 'Select employee…' }: { label: string; adapter: EntitySelectAdapter<{ companyId?: string }>; params?: { companyId?: string }; placeholder?: string }) {
  const field = useFieldContext<string>()
  const [options, setOptions] = useState<EntityOption[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    adapter.loadOptions(params).then((opts) => { if (!mounted) return; setOptions(opts); setLoading(false) })
    return () => { mounted = false }
  }, [adapter, JSON.stringify(params)])

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : (
        <select value={field.state.value ?? ''} onChange={(e) => { field.handleChange(e.target.value); field.handleBlur() }} className="border rounded-md px-2 py-1 w-full">
          <option value="">{placeholder}</option>
          {options.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      )}
    </div>
  )
}
