export type FileUploadAdapter = {
  openPicker: (options?: { multiple?: boolean; accept?: string[] }) => Promise<File[]>
  upload: (files: File[]) => Promise<Array<{ id: string; url: string; name: string; size: number }>>
  list?: (context?: { entityId?: string }) => Promise<Array<{ id: string; url: string; name: string; size: number }>>
  remove?: (id: string) => Promise<void>
}

export type SignatureAdapter = {
  save: () => Promise<{ id: string; url: string }>
  clear: () => void
}

export type PhoneAdapter = {
  format: (value: string) => string
  parse: (value: string) => string
  validate?: (value: string) => boolean
}

export type EntityOption = { value: string; label: string }

export type EntitySelectAdapter<TParams = unknown> = {
  loadOptions: (params?: TParams) => Promise<EntityOption[]>
  getLabel?: (value: string) => Promise<string | null>
}

export type GridNavigationAdapter = {
  wrap: (node: React.ReactNode, opts?: { row?: number; col?: number }) => React.ReactNode
}
