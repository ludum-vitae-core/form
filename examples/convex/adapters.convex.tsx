'use client'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useMemo, useCallback } from 'react'

export function useEmployeeSelectAdapter() {
  const employees = useQuery(api.employees.listEmployeesForCompany, {})
  const options = useMemo(() => (employees ?? []).map((e) => ({ value: e._id, label: e.employeeName })), [employees])
  const loadOptions = useCallback(async () => options, [options])
  return { loadOptions }
}

export function useFileUploadAdapter() {
  const createFiles = useMutation(api.files.create)
  const genUrl = useMutation(api.files.generateUploadUrl)
  const complete = useMutation(api.files.completeUpload)

  const upload = useCallback(async (files: File[]) => {
    const metas = files.map((f) => ({ name: f.name, size: f.size, type: f.type, category: 'General' as const }))
    const fileIds = await createFiles({ category: 'General', files: metas })
    const results: Array<{ id: string; url: string; name: string; size: number }> = []
    for (let i = 0; i < files.length; i++) {
      const id = fileIds[i]
      const url = await genUrl({ fileId: id })
      const res = await fetch(url, { method: 'POST', body: files[i] })
      const { storageId } = await res.json()
      await complete({ id, storageId })
      results.push({ id, url: id, name: files[i].name, size: files[i].size })
    }
    return results
  }, [createFiles, genUrl, complete])

  return { upload }
}
