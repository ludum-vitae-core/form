'use client'
import React from 'react'
import { useFormMode } from '../../index'
import { ResetButton } from './ResetButton'
import { SubmitButton } from './SubmitButton'

export function FormFooter({ onReset, submitText = 'Submit Form', resetText = 'Clear', className = '' }: { onReset?: () => void; submitText?: string; resetText?: string; className?: string }) {
  const mode = useFormMode()
  if (mode === 'view') return null

  return (
    <div className={`flex items-center justify-between gap-6 w-full px-2 py-2 bg-muted border rounded-xl shadow-sm ${className}`}>
      <ResetButton onReset={onReset}>{resetText}</ResetButton>
      <SubmitButton>{submitText}</SubmitButton>
    </div>
  )
}
