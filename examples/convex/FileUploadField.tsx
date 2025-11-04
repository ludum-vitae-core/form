'use client'
import React, { useRef, useState } from 'react'
import { useFieldContext } from '@ludumvitae/form'

export type UploadedFile = { id: string; url: string; name: string; size: number }
export type FileUploadAdapter = { openPicker?: (o?: { multiple?: boolean; accept?: string[] }) => Promise<File[]>; upload: (files: File[]) => Promise<UploadedFile[]>; remove?: (id: string) => Promise<void> }

export function FileUploadField({ label, adapter, multiple = true, accept }: { label: string; adapter: FileUploadAdapter; multiple?: boolean; accept?: string[] }) {
  const field = useFieldContext<string[]>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const files = Array.isArray(field.state.value) ? field.state.value : []

  const handleClick = async () => {
    if (!adapter.openPicker) { inputRef.current?.click(); return }
    const picked = await adapter.openPicker({ multiple, accept })
    if (!picked || picked.length === 0) return
    setBusy(true)
    try { const uploaded = await adapter.upload(picked); const urls = uploaded.map((f) => f.url); field.handleChange(multiple ? [...files, ...urls] : [urls[0]]); field.handleBlur() } finally { setBusy(false) }
  }

  const onNativeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list || list.length === 0) return
    const arr = Array.from(list)
    setBusy(true)
    try { const uploaded = await adapter.upload(arr); const urls = uploaded.map((f) => f.url); field.handleChange(multiple ? [...files, ...urls] : [urls[0]]); field.handleBlur(); if (inputRef.current) inputRef.current.value = '' } finally { setBusy(false) }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>
        <button type="button" onClick={handleClick} disabled={busy} className="px-2 py-1 border rounded-md">{busy ? 'Uploading…' : 'Select files'}</button>
      </div>
      <input ref={inputRef} type="file" hidden multiple={multiple} accept={accept?.join(',')} onChange={onNativeChange} />
      <ul className="list-disc pl-5 space-y-1">
        {files.map((url) => (
          <li key={url}><a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm truncate">{url}</a></li>
        ))}
      </ul>
    </div>
  )
}
