# Form API (v2)

[Main documentation](../../../README.md#forms)

`Form` owns current values, errors and collection rows. `FormViewType` describes
field metadata and initial values; update values through the form API.
Public imports below come from `@dakataa/crud-react`.

## Basic form

```tsx
import { useRef } from "react";
import { Form, Input } from "@dakataa/crud-react";
import type { FormRef, FormViewType } from "@dakataa/crud-react";

const titleView: FormViewType = {
    type: "text",
    full_name: "article[title]",
    data: "",
    required: true
};

export function ArticleForm() {
    const formRef = useRef<FormRef | null>(null);

    return (
        <Form
            ref={formRef}
            onSubmit={(data) => {
                console.log(data.get("article[title]"));
            }}>
            <Input view={titleView} />
            <button
                type="button"
                onClick={() => {
                    formRef.current?.setValue("article[title]", "New article");
                }}>
                Fill title
            </button>
            <button type="reset">Reset</button>
            <button type="submit">Save</button>
        </Form>
    );
}
```

`Form` handles validation and builds native `FormData`. Its `onSubmit` callback
handles saving; the base component does not send a network request itself.

| `Form` prop                  | Purpose                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| `onSubmit(data, submission)` | Receives `FormData` and a snapshot of the submitted draft.       |
| `onBeforeSubmit(data)`       | Adjusts the payload after validation, before `onSubmit`.         |
| `onReset()`                  | Runs after the initial values and form state are restored.       |
| `onStateChange(state)`       | Observes the initial state and later committed state changes.    |
| `ref`                        | Exposes `FormRef`.                                               |
| `method`                     | `'GET'` or `'POST'`; saving is handled by `onSubmit`.            |
| HTML attributes              | Supports `id`, `name`, `action`, `className`, `noValidate`, etc. |

`submission` has `revision`, `values` and `collections`; ordinary submit handlers
can use only the first argument. `FormValue` is `string | string[] | null`.

## FormRef: read and update values

Use full HTML field names, such as `article[title]`.

| Method                  | Purpose                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| `getFormData()`         | Returns the current payload of mounted, enabled controls.                   |
| `setValue(name, value)` | Updates one value, including an unmounted field.                            |
| `setValues(values)`     | Updates a record of field names and values.                                 |
| `setFormData(data)`     | Replaces string values; absent fields are cleared. File inputs stay native. |
| `setErrors(errors)`     | Replaces errors, keyed by field name; each error has a `message`.           |
| `success()`             | Sets the success flag and clears `submitting`.                              |
| `reset()`               | Restores the current reset baseline and clears errors and submission state. |
| `submit()`              | Requests submission through native and registered validation.               |

`setValue()` followed immediately by `getFormData()` or `submit()` sees the new
value. Programmatic setters do not validate automatically; a field's `change`
method validates on edit, and submission validates active controls.

## UseForm: access; useFormState: subscription

Call these hooks inside a component rendered below `Form`:

```tsx
import { UseForm, useFormState } from "@dakataa/crud-react";

export function SaveButton() {
    const { apiRef } = UseForm();
    const { submitting } = useFormState();

    return (
        <button
            type="button"
            disabled={submitting}
            onClick={() => {
                apiRef.current?.submit();
            }}>
            Save
        </button>
    );
}
```

`UseForm()` returns a stable `{ store, apiRef, elementRef }` object. `apiRef`
exposes `FormRef`; `elementRef` points to the native `<form>`. This hook does
not subscribe to changes. Prefer `apiRef` for imperative reads and setters;
`store.getValue(name)` and `store.getState()` read snapshots without subscribing.

`useFormState()` subscribes to `errors`, `constraints`, `success` and `submitting`.
Use `useFormField()` for reactive field values and `useFormErrors(names)` for
selected errors. Field edits do not rerender unrelated controls or components
that only call `UseForm()`.

To observe the form from a parent outside its context, use `onStateChange`.
Both `Form` and `CrudForm` accept it:

```tsx
import { useState } from "react";
import { CrudForm } from "@dakataa/crud-react";

export function VerificationForm({ resendCode }: { resendCode: () => void }) {
    const [verifying, setVerifying] = useState(false);

    return (
        <>
            <CrudForm onStateChange={({ submitting }) => setVerifying(submitting)}>
                {/* Form fields */}
            </CrudForm>
            <button type="button" disabled={verifying} onClick={resendCode}>
                Resend code
            </button>
        </>
    );
}
```

Here `resendCode` is your application's resend handler.
The callback runs after React commits, including when observation starts. Replacing
the callback alone does not notify again. It receives `errors`, `constraints`,
`success` and `submitting`; field values remain separate in the store. Batched
updates can produce one notification with the final committed state. Use hooks
inside the form context and this callback for surrounding UI. The inherited HTML
`onChange` remains the native field change event.

## useFormField: custom controls

`useFormField(view, constraints?, initialize?)` binds a control to the form store. The view
must have a stable `full_name`. For custom value conversions, the optional pure
`initialize(view)` returns a `FormValue` and also normalizes later backend
responses. Keep this callback stable, for example with `useCallback`. This
example is for a text field:

```tsx
import { useFormField } from "@dakataa/crud-react";
import type { FormViewType } from "@dakataa/crud-react";

export function CustomTitle({ view }: { view: FormViewType }) {
    const field = useFormField(view);
    const value = Array.isArray(field.value) ? "" : (field.value ?? "");

    return (
        <input
            name={field.name}
            value={value}
            aria-invalid={field.errors.length > 0}
            onChange={(event) => {
                field.change(event.target.value);
            }}
        />
    );
}
```

| Returned member       | Purpose                                                                    |
| --------------------- | -------------------------------------------------------------------------- |
| `value`               | Current editable value.                                                    |
| `name`                | HTML field name.                                                           |
| `errors`              | Errors for this field.                                                     |
| `dirty`               | Whether the value differs from its reset baseline.                         |
| `change(value)`       | Updates, clears backend errors for the field and validates.                |
| `change(updater)`     | Computes a new value from the latest value; useful for grouped selections. |
| `changeNative(files)` | Tracks an edit and validates native file selection.                        |

`constraints` implement [Constraint](./constraint/Contraint.tsx): `isValid(value)`
and `getMessage()`, with `message` and `options`. Built-in `Input` and `Choice`
also accept `constraints`, `view`, `ref` and `onChange` props.

Checkboxes and radios bind `checked` separately from their submitted `value`.
File inputs remain uncontrolled; their selected files are read from the DOM.

## Backend schema rendering

`CrudForm` loads `form.modify.view` from the current CRUD data provider and
submits the current action as `POST`. It requires the standard CRUD contexts.
It supplies `FormViewProvider` automatically.

For manual response handling, `FormViewProvider.syncMode` is `'refresh'` (default),
`'invalid'` or `'saved'`. Pass the submit snapshot as `submission` to preserve
newer edits. `allowDuplicates` permits multiple renderers for the same field.

| API                                | Purpose                                                                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `CrudForm`                         | Supports `onLoad`, `onSuccess`, `onError`, `embedded` and a ref exposing `getFormRef()`. `embedded` suppresses redirect navigation. |
| `FormViewProvider`                 | Supplies a `view` below `Form`; supports `allowDuplicates`, `syncMode` and `submission`.                                            |
| `UseFormView()`                    | Returns the current schema node as `form` and relative `setValue` / `setValues` helpers.                                            |
| `FormGroup`                        | Renders a field with label, errors and help; `name` selects a direct child.                                                         |
| `FormField`                        | Renders only the control; accepts `name` and shallow `options`.                                                                     |
| `FormFieldViewLoader` / `FormRest` | Renders remaining fields from the current node.                                                                                     |
| `FormError` / `FormRestError`      | Renders selected errors / errors without an inline renderer.                                                                        |
| `UseCollection()`                  | Provides `items`, `addItem`, `removeItem` and `isPrototype` inside a collection.                                                    |
| `UseCollectionItem()`              | Provides the current row's `index` and `removeItem`.                                                                                |

For example, inside an add/edit form template:

```tsx
import { FormGroup, FormRest, UseFormView } from "@dakataa/crud-react";

export function ArticleFields() {
    const { setValue } = UseFormView();

    return (
        <>
            <FormGroup name="title" options={{ label: "Article title" }} />
            <FormGroup name="companyNumber" optional />
            <button
                type="button"
                onClick={() => {
                    setValue("title", "New article");
                }}>
                Fill title
            </button>
            <FormRest />
        </>
    );
}
```

`FormGroup`'s `optional` returns `null` for a missing child. Its `options` are
shallow overrides and cannot change `type`. Relative setters support dotted
paths, such as `address.street`; `FormGroup` and `FormField` select direct children.
`CrudForm.onSuccess` may return a promise; redirect navigation waits for it.
`CrudForm.onError(error)` handles failed submissions locally: HTTP errors carry
`status`, `detail` and optional `trace`; network failures use status `0`. The
form keeps its draft and clears `submitting` and its loading indicator. Backend
validation errors stay inline; canceled requests do not invoke the callback.
Without `onError`, the request provider's existing error handling applies. Return
`false` from the callback to delegate an error to that handling (for example HTTP 401).

```tsx
<CrudForm
    onError={(error) => {
        showError(error.detail);
    }}
/>
```

Here `showError` is your application's notification function. Initial loading
errors are handled by the request provider, before the form is available.

## Value lifecycle

- Hiding a managed field preserves its draft. Unmounted and disabled controls
  are excluded from `FormData`; ordinary native inputs need the binding hook
  for their values to survive unmounting.
- A refresh updates pristine fields and the reset baseline. Invalid submission
  keeps the previous baseline; a successful submission adopts persisted values
  for enabled, mounted fields while preserving newer edits and drafts that were
  excluded from the POST. Unchecked selections still participate. Collections
  track participation even when every row has been removed.
- `options.data`, `options.value` and `options.checked` set initial defaults once
  per field/session. Use setters for subsequent updates. Binding-owned `value`,
  `checked` and `name` attributes cannot be replaced through `attr`.
- Collection rows keep stable names through backend responses. Changing the
  edited record starts a new session. Reset restores baseline rows and values;
  file selection is cleared and cannot be restored after remounting.

## Migration from v1

- Replace `const [[state, dispatch], formRef, elementRef] = UseForm()` with
  `const { store, apiRef, elementRef } = UseForm()` and
  `const state = useFormState()` where a state subscription is needed.
- Replace value/error operations with `apiRef.current` setters. Replace
  submission flags with `store.setSubmitting(boolean)` and
  `store.setSuccess(boolean)`.
- Register custom constraints through `useFormField(view, constraints)` and
  update the value through `field.change()`. Native controls keep browser
  validation; controls using custom constraints need this binding.
- Keep application response data in application state. `FormAction`, `dispatch`,
  `FormState.response` and the separate `UseFormRuntime` hook are removed.
- `UseFormView()` exposes `form`, relative setters and `allowDuplicates`.
  Rendering and error ownership are tracked automatically; manual methods such
  as `setRendered` and `setErrorRendered` are removed.
- The unused `Choice.prototype` prop is removed. Collection prototypes remain
  defined by `FormViewType.prototype`.

`FormSubmission.fields` and `collectionNames` identify the controls participating
in a submit. `store.snapshot()` defaults to all cached values; pass the participating
names when implementing your own partial-submit flow.

`FormRef`, `CrudForm.onError` and the schema/collection components remain supported.
