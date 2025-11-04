export { FormProvider } from './core/providers/FormProvider'
export { FormSchemaProvider } from './core/providers/FormSchemaProvider'
export { FormSchemaContext, useFormSchemaContext } from './core/schema/schema-context'
export {
  useAppForm,
  fieldContext,
  useFieldContext,
  formContext,
  useFormContext,
} from './core/form/form'
export { createUseAppForm } from './core/form/form'

// Field components
export { TextField } from './core/fields/TextField'
export { TextAreaField } from './core/fields/TextAreaField'
export { CheckboxField } from './core/fields/CheckboxField'
export { SelectField } from './core/fields/SelectField'
export { RadioField } from './core/fields/RadioField'
export { SwitchField } from './core/fields/SwitchField'
export { NumberField } from './core/fields/NumberField'
export { FieldErrors } from './core/fields/FieldErrors'
export { EmailField } from './core/fields/EmailField'
export { PasswordField } from './core/fields/PasswordField'
export { LengthCounter } from './core/fields/LengthCounter'
export { ArrayField } from './core/fields/ArrayField'
export { ObjectArrayField } from './core/fields/ObjectArrayField'
export { DatePicker } from './core/fields/DatePicker'
export { DateTimePickerField } from './core/fields/DateTimePickerField'
export { TimePicker } from './core/fields/TimePicker'

// Form components
export { ErrorDisplay } from './core/components/ErrorDisplay'
export { SubmitButton } from './core/components/SubmitButton'
export { ResetButton } from './core/components/ResetButton'
export { FormFooter } from './core/components/FormFooter'

// Adapter type interfaces
export * from './adapters/types'

// Form mode context
import React, { createContext, useContext } from 'react'

export const FormModeContext = createContext<'view' | 'add' | 'edit' | 'disabled' | 'adminEdit'>(
  'edit'
)

export function useFormMode() {
  return useContext(FormModeContext)
}
