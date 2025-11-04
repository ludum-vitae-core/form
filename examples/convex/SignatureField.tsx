'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useFieldContext } from '@ludumvitae/form'

export type SignatureAdapter = { save: () => Promise<{ id: string; url: string }>; clear: () => void; mount?: (canvas: HTMLCanvasElement) => void }

export function SignatureField({ label, adapter }: { label: string; adapter: SignatureAdapter }) {
  const field = useFieldContext<string>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { if (canvasRef.current && adapter.mount) adapter.mount(canvasRef.current) }, [adapter])

  const onClear = () => { adapter.clear(); field.handleChange(''); field.handleBlur() }
  const onSave = async () => { setBusy(true); try { const { url } = await adapter.save(); field.handleChange(url); field.handleBlur() } finally { setBusy(false) } }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      <canvas ref={canvasRef} className="border rounded-md w-full h-40" />
      <div className="flex gap-2">
        <button type="button" className="px-2 py-1 border rounded" onClick={onClear}>Clear</button>
        <button type="button" className="px-2 py-1 border rounded" onClick={onSave} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
      </div>
      {field.state.value && (<div className="text-xs text-muted-foreground break-all">Saved: {field.state.value}</div>)}
    </div>
  )
}
