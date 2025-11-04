## @ludumvitae/form

[![npm version](https://img.shields.io/npm/v/@ludumvitae/form.svg)](https://www.npmjs.com/package/@ludumvitae/form)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Links: [`GitHub repo`](https://github.com/ludum-vitae-core/form) · [`npm package`](https://www.npmjs.com/package/@ludumvitae/form)

A small, practical set of form building blocks for LV Artifact projects. It’s built on TanStack Form and Zod, and it stays UI-agnostic so you can bring your own components.

### Install

```bash
pnpm add @ludumvitae/form
```

### Quickstart (Provider)

```tsx
import { useAppForm, FormProvider, FormModeContext } from '@ludumvitae/form'

const schema = z.object({ name: z.string().min(2).max(50) })

export function MyForm() {
  const form = useAppForm({
    defaultValues: { name: '' },
    validators: { onSubmit: schema },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <FormModeContext.Provider value="edit">
      <FormProvider schema={schema} mode="edit">
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
          <form.AppField name="name">{(field) => <field.TextField label="Name" />}</form.AppField>
        </form>
      </FormProvider>
    </FormModeContext.Provider>
  )
}
```

### Quickstart (Standalone)

```tsx
import { TextField } from '@ludumvitae/form'

export function Standalone() {
  const [name, setName] = useState('')
  return <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
}
```

### What’s included

- **Hooks/contexts**: `useAppForm`, `fieldContext`, `useFieldContext`, `formContext`, `useFormContext`, `FormModeContext`, `useFormMode`
- **Providers**: `FormProvider`, `FormSchemaProvider`, `FormSchemaContext`, `useFormSchemaContext`
- **Fields**: `TextField`, `TextAreaField`, `EmailField`, `PasswordField`, `NumberField`, `CheckboxField`, `RadioField`, `SelectField`, `SwitchField`, `ArrayField`, `ObjectArrayField`, `DatePicker`, `TimePicker`, `DateTimePickerField`, `LengthCounter`, `FieldErrors`
- **Components**: `ErrorDisplay`, `SubmitButton`, `ResetButton`, `FormFooter`

### Validation

- **Default**: validate on submit via `validators.onSubmit`
- **Optional**: `validators.onChange`/`validators.onBlur` for alternative flows
- **Schema-aware**: `FormProvider` passes your Zod schema to fields; `LengthCounter` and constraints (min/max/pattern) are automatically derived for string fields

### Adapters (advanced)

Some features are app-specific or rely on external services/UI. Use the adapter interfaces in `src/adapters/types.ts` and inject your own implementations:

- File uploads: `FileUploadAdapter`
- Signature: `SignatureAdapter`
- Phone: `PhoneAdapter`
- Entity selects: `EntitySelectAdapter`
- Grid navigation: `GridNavigationAdapter`

### Contributing

We welcome issues and PRs.

- File issues: `https://github.com/ludum-vitae-core/form/issues`
- Open PRs: `https://github.com/ludum-vitae-core/form/pulls`

Before submitting, run the build locally:

```bash
pnpm i
pnpm build
```
