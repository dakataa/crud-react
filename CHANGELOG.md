# Changelog

## 2.0.0 — 2026-11-04

Forms now keep unsaved edits when fields are hidden and shown again, and better
handle validation and server responses. This release also improves translations,
lists and error handling. Custom integrations need the API updates below.

Changes since `1.0.10`.

### What's new

- **Forms remember edits.** Field values and added or removed collection rows survive
  unmounting. Server responses preserve newer edits made while saving.
- **React to individual field changes.** Use `useFormField` for custom controls,
  `useFormValue` / `useFormValues` to watch values, and `useFormErrors` for errors.
  `useFormState` watches form status; `onStateChange` exposes it to parent components.
- **More control over saving and errors.** `Form.onSubmit(data, submission, runtime)`
  provides a snapshot of submitted values and access to the form API. Handle failures
  with `GetData.onError`, `GetData.throwOnError` or `CrudForm.onError`.
  Redirects wait for asynchronous `CrudForm.onSuccess` handlers.
- **Easier form customization.** `FormGroup` and `FormField` accept `optional` for
  fields that may be absent. Error components accept HTML and accessibility attributes.
  Schema attributes such as `class`, `for` and `readonly` are converted to React names.
- **Shared helpers and translations.** Export `choiceToken`, `choiceList`,
  `selectionTokens` and `resolveAttribute`. `config.translate` handles form labels,
  help text, placeholders, accessible labels and choice group labels.
- **More display options.** Add configurable timezone, customizable pagination and
  list/action helpers for embedded views.

### Fixes

- Validation responses preserve edited values and update untouched fields with new
  backend defaults. Programmatic changes are available immediately to submission
  and `getFormData()`.
- Compound filters and choice groups keyed by identifiers work correctly.
- Sorting stays consistent across Activity tab changes, without duplicate handlers.
- List item actions work when no permission is declared.
- Canceled requests no longer cause unhandled request-abort errors.
- Modals share animations and play them in reverse when closing.

### Breaking changes

- **Dependencies:** `@dakataa/requester` now requires **^3.0.0** instead of **^2.0.3**.
  React and React DOM remain at **^19.2.3**.
- **Form context:** `UseForm()` returns `{ store, apiRef, elementRef }` instead of
  `[[state, dispatch], formRef, elementRef]`. Read status with `useFormState()` and
  change values through `apiRef.current`. `FormRef` remains supported.
- **Field values:** `FormViewType` and `options.data` / `value` / `checked` describe
  initial values. Use setters for later updates; changing `view.data` has no effect.
  Bind custom validation with `useFormField(view, constraints)` and `field.change()`.
- **Removed APIs:** `FormAction`, `dispatch`, `FormState.response`,
  `UseFormView().setRendered`, `UseFormView().setErrorRendered` and `Choice.prototype`.
  Keep response data in application state. Collection prototypes still use
  `FormViewType.prototype`.
- **Translations:** replace translation templates with `config.translate`.
  Custom templates can call `UseTranslate()`.
- **Action and list contexts:** use `actionRequest` / `setActionRequest` instead of
  `action` / `setAction`. Pass `actionRequest` to `CurrentActionRequestProvider` and
  `GetDataByAction`. `ListProvider` now reads data from the data context, not a `data` prop.

Renamed public exports:

| Before                     | Now                               |
| -------------------------- | --------------------------------- |
| `Action`                   | `ActionLink`                      |
| `OnClickAction`            | `ActionRequestType`               |
| `CurrentActionProvider`    | `CurrentActionRequestProvider`    |
| `CurrentActionProviderRef` | `CurrentActionRequestProviderRef` |
| `UseCurrentAction`         | `UseCurrentActionRequest`         |
| `GetDataByActionProps`     | `GetDataByActionRequestProps`     |
| `ListContextType`          | `ListContextPropsType`            |

### Upgrading from v1

1. Update `@dakataa/crud-react` to `^2.0.0` and `@dakataa/requester` to `^3.0.0`.
2. Apply the API changes above. For custom forms, follow the
   [Form API migration guide](https://github.com/dakataa/crud-react/blob/v2.0.0/src/component/form/README.md#migration-from-v1).
3. Check saving, validation, conditional fields, collections, translations, filters,
   sorting and modal navigation in your application.

Native controls still submit normally. Use `useFormField` to preserve custom control
values across unmounts. Unmounted and disabled controls are excluded from `FormData`.
