"use client"
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { TextField } from '../fields/TextField'
import { CheckboxField } from '../fields/CheckboxField'
import { TextAreaField } from '../fields/TextAreaField'
import { SelectField } from '../fields/SelectField'
import { RadioField } from '../fields/RadioField'
import { SwitchField } from '../fields/SwitchField'
import { NumberField } from '../fields/NumberField'
import { EmailField } from '../fields/EmailField'
import { PasswordField } from '../fields/PasswordField'
import { LengthCounter } from '../fields/LengthCounter'
import { ArrayField } from '../fields/ArrayField'
import { ObjectArrayField } from '../fields/ObjectArrayField'
import { DatePicker } from '../fields/DatePicker'
import { DateTimePickerField } from '../fields/DateTimePickerField'
import { TimePicker } from '../fields/TimePicker'

// Re-export contexts so consumers and fields can bind to the same instances
export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

// Minimal useAppForm for now: no fieldComponents mapped yet. Consumers can still use
// TanStack Form primitives. We'll wire fieldComponents after migrating fields.
const defaultFieldComponents = {
  TextField,
  CheckboxField,
  TextAreaField,
  SelectField,
  RadioField,
  SwitchField,
  NumberField,
  EmailField,
  PasswordField,
  LengthCounter,
  ArrayField,
  ObjectArrayField,
  DatePicker,
  DateTimePickerField,
  TimePicker,
} as const

const defaultFormComponents = {} as const

export const { useAppForm } = createFormHook({
  fieldComponents: defaultFieldComponents,
  formComponents: defaultFormComponents,
  fieldContext,
  formContext,
})

export function createUseAppForm(overrides?: {
  fieldComponents?: Partial<typeof defaultFieldComponents>
  formComponents?: Partial<typeof defaultFormComponents>
}) {
  const mergedFieldComponents = { ...defaultFieldComponents, ...(overrides?.fieldComponents ?? {}) }
  const mergedFormComponents = { ...defaultFormComponents, ...(overrides?.formComponents ?? {}) }
  return createFormHook({
    fieldComponents: mergedFieldComponents,
    formComponents: mergedFormComponents,
    fieldContext,
    formContext,
  }).useAppForm
}
