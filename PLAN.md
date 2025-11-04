## @lv-artifact/form - Implementation Plan and Merge Guide

### Package Surface (Public API)

- Core form API
  - `useAppForm`, `fieldContext`, `useFieldContext`, `formContext`, `useFormContext`
  - `FormModeContext`, `useFormMode`
- Providers and schema
  - `FormProvider`, `FormSchemaProvider`, `FormSchemaContext`, `useFormSchemaContext`
- Field components (generic, UI-agnostic or native)
  - `TextField`, `TextAreaField`, `EmailField`, `PasswordField`, `NumberField`
  - `CheckboxField`, `RadioField`, `SelectField`, `SwitchField`
  - `ArrayField`, `ObjectArrayField`
  - `DatePicker` (native), `TimePicker` (native), `DateTimePickerField` (native)
  - `LengthCounter`, `FieldErrors`
- Form UI components (generic)
  - `ErrorDisplay`, `SubmitButton`, `ResetButton`, `FormFooter`

Note: UI primitives used internally come from `adapters/ui.tsx` (Input, Textarea, Label, Checkbox, Button, cn). These are internal and can be swapped later via a provider if needed.

### What Remains (Generic/Minimal)

- Constraints extraction from Zod schema:
  - Current: `useFieldConstraints` returns `{}` as a placeholder
  - Option A (recommended): add a small extractor util in package
  - Option B: allow an injectable extractor via context
- Docs: provider vs standalone usage; `form.AppField` pattern; date/time notes

### What to Exclude or Make Pluggable (Adapters)

These are app-specific or depend on external services/UI libraries. Provide adapter interfaces and keep out of core:

- File uploads: `FileUploadAdapter` (openPicker/upload/list/remove) + rendering hooks
- Signature: `SignatureAdapter` (draw/save/clear)
- Phone: `PhoneAdapter` (format/parse/validate)
- Entity selects: `EntitySelectAdapter` (loadOptions/getLabel) for contacts/employees/documents/forms
- Advanced layout/navigation: `GridNavigationAdapter` (optional wrapper for admin editors)

Ship adapter interface types and example stubs in `docs/` or `examples/`, not in core.

### API Design Decisions

- `useAppForm` provides default `fieldComponents`; users can override by passing custom components
- Fields accept both context and direct props; prefer context when available
- Validation default: `onSubmit`, with optional `validators` for `onChange`/`onBlur`
- Modes standardized: `view | add | edit | disabled | adminEdit` with expected behavior

### Build and Publishing

- ESM-only package with `exports` and `types`
- `peerDependencies`: `react`, `react-dom`, `zod`
- Build via `tsup`; `prepublishOnly` runs build; `files: ["dist"]`
- Add `LICENSE` and expand `README.md` with quickstart, examples, adapters, migration
- Semantic versioning starting at `0.x`; optional CI for publish

### Migration Plan (This Repo)

1) Replace imports for covered items:
   - From `@/components/form/...` to `@lv-artifact/form` for:
     - Fields: Text, TextArea, Email, Password, Number, Checkbox, Radio, Select, Switch, Array, ObjectArray, Date/Time
     - Utilities/Components: LengthCounter, FieldErrors, ErrorDisplay, SubmitButton, ResetButton, FormFooter
     - Providers/Contexts: FormProvider, FormSchemaProvider, FormSchemaContext, FormModeContext
     - Hook: `useAppForm`

2) Leave app-specific fields in place initially (uploads, signature, phone, NAICS, entity selects, advanced time picker, grid/order nav)

3) Incrementally migrate app-specific fields using adapters; remove originals once verified

### Back-Compat & Consistency

- Preserve prop names and behavior (`label`, `hideLabel`, `width`, etc.)
- Document differences where any exist; keep fields lean and predictable

### Testing/Verification Checklist

- Render each field in `edit` and `view` modes
- Validation flows: `ErrorDisplay` + `FieldErrors` show appropriately
- Submit and reset via `SubmitButton` and `ResetButton`
- Arrays: `ArrayField`/`ObjectArrayField` add/remove/update rows, preserve values on blur
- Date/time: set and read values accurately using native inputs
- `LengthCounter` works when `maxLength` is available (once extractor added)
- Examples compile for both provider-based and standalone usage

### Optional Near-Term Improvements

- Add minimal Zod extractor to power `useFieldConstraints`
- Introduce `FormUIProvider` to inject UI primitives (adapters) globally
- Provide a simple example app or Storybook showcasing all components


