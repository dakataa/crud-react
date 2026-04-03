# CRUD Dashboard React

`@dakataa/crud-react` is a React frontend library for building CRUD admin panels and dashboards.

It is designed to work with [`@dakataa/crud`](https://github.com/dakataa/crud), but it can also run against any backend that returns the same action and view data structures.

The library provides:

- automatic CRUD route resolution from backend actions
- default list/add/edit screens
- dynamic template overrides per namespace
- schema-driven form rendering
- modal and alert helpers
- Bootstrap-based UI components

## Contents

1. [How it works](#how-it-works)
2. [Installation](#installation)
3. [Quick start](#quick-start)
4. [Configuration](#configuration)
5. [Backend contract](#backend-contract)
6. [Templates and dynamic views](#templates-and-dynamic-views)
7. [Routing](#routing)
8. [Forms](#forms)
9. [Hooks and contexts](#hooks-and-contexts)
10. [Core components](#core-components)
11. [Troubleshooting](#troubleshooting)

## How it works

The library loads available CRUD actions from `/_crud/actions`, matches the current URL to one of those actions, fetches the data for that action, and renders the matching view.

The default built-in views are:

- `list`
- `add`
- `edit`

Each view can be overridden with files loaded through `import.meta.glob('./crud/**')`.

## Installation

Install the package:

```bash
npm install @dakataa/crud-react
```

or:

```bash
yarn add @dakataa/crud-react
```

This package also expects these peer dependencies in your app:

- `react`
- `react-dom`
- `@dakataa/requester`
- `@dakataa/crud-theme`
- `@popperjs/core`
- `lottie-web`

If your project does not already include Bootstrap styles, add your theme or Bootstrap setup in the host application.

## Quick start

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Crud,
  CrudConfiguration,
  CrudLoader,
  MainLayout,
  Outlet,
  Route,
  Router,
} from '@dakataa/crud-react';

const templates = import.meta.glob('./crud/**');

CrudConfiguration({
  connection: {
    baseURL: 'https://project.local',
    headers: {
      Accept: 'application/json',
    },
  },
  templates,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Crud
      config={{
        templates,
        currency: 'BGN',
        locale: 'bg',
        env: import.meta.env.CRUD_ENV,
      }}
    >
      <Router>
        <Route element={<MainLayout><Outlet /></MainLayout>}>
          <Route path="*" element={<CrudLoader />} />
        </Route>
      </Router>
    </Crud>
  </StrictMode>
);
```

## Configuration

There are two configuration layers:

- `CrudConfiguration(...)` configures the shared requester namespace and global templates
- `<Crud config={...}>` configures runtime behavior for the current React tree

### `CrudConfiguration`

```ts
import { CrudConfiguration } from '@dakataa/crud-react';

CrudConfiguration({
  connection: {
    baseURL: 'https://crud-api.local',
    headers: {
      Accept: 'application/json',
    },
  },
  templates: import.meta.glob('./crud/**'),
});
```

### `Crud` config

```ts
type Config = {
  env?: 'prod' | 'dev' | 'test' | string;
  link?: {
    path?: string;
    prefix?: string;
    includePrefix?: boolean;
  };
  templates?: { [path: string]: () => Promise<any> };
  locale?: string;
  currency?: string;
  options?: {
    HTMLTableElement: React.HTMLAttributes<HTMLTableElement>;
    GridView: React.HTMLAttributes<HTMLDivElement>;
  };
};
```

### Common options

- `env`: environment flag exposed through `UseConfig()`
- `templates`: runtime template overrides merged with global templates
- `locale`: used by components such as `Money`
- `currency`: default currency for money formatting
- `link.prefix`: useful when the CRUD UI is mounted under a sub-path such as `/admin`
- `link.path`: lets you force `CrudLoader` to resolve a custom path instead of `location.pathname + location.search`
- `options.HTMLTableElement`: default props for generated tables
- `options.GridView`: default props for the `GridView` wrapper

## Backend contract

For the library to work, your backend must expose action metadata and action payloads in the expected format.

### 1. Actions endpoint

The frontend loads available actions from:

```text
/_crud/actions
```

Each action looks like this:

```ts
type ActionType = {
  entity: string;
  namespace?: string;
  name: string;
  title?: string;
  visibility?: 'list' | 'object' | 'internal';
  permission?: string;
  route?: {
    path: string;
    defaults?: { [key: string]: string };
    methods?: string[];
  };
};
```

Example:

```json
[
  {
    "entity": "Article",
    "namespace": "blog",
    "name": "list",
    "title": "Articles",
    "visibility": "list",
    "route": {
      "path": "/article"
    }
  },
  {
    "entity": "Article",
    "namespace": "blog",
    "name": "edit",
    "title": "Edit article",
    "visibility": "object",
    "route": {
      "path": "/article/{id}/edit"
    }
  }
]
```

### 2. List response

The default list view expects a payload compatible with:

```ts
type ListType = {
  title: string | null;
  entity: {
    name: string;
    columns: ColumnType[];
    primaryColumn: ColumnType;
    data: {
      items: Array<{ [key: string]: any }>;
      meta: ListMetaType;
    };
    acl: { [key: string]: Array<number | string> };
  };
  form: {
    [key: string]: FormType;
    filter: FormType;
    batch: FormType;
  };
  sort: { [key: string]: 'ASC' | 'DESC' | null };
  action: { [key: string]: ActionType };
};
```

This powers:

- table/grid columns
- row actions
- pagination
- filters
- batch actions

### 3. Modify response

The default add/edit view expects:

```ts
type ModifyType = {
  title: string | null;
  object: { [key: string]: any } | null;
  form: { [key: string]: FormType };
  messages: { [key: string]: string[] };
  redirect?: RedirectType;
};
```

The key part is `form.modify.view`, which contains the schema used to render the form.

## Templates and dynamic views

Dynamic views are loaded from the `templates` object you pass through `CrudConfiguration` or `<Crud config={...}>`.

Typical setup:

```ts
const templates = import.meta.glob('./crud/**');
```

The resolver looks for files in this order:

1. `crud/{namespace}/{prefix}/{ViewName}.tsx`
2. `crud/general/{prefix}/{ViewName}.tsx`

View names are normalized to PascalCase, so:

- `list` -> `List.tsx`
- `content` -> `Content.tsx`
- `user_profile` -> `UserProfile.tsx`
- `user.profile` -> `UserProfile.tsx`

### Useful template locations

- `crud/{namespace}/List.tsx`
- `crud/{namespace}/Add.tsx`
- `crud/{namespace}/Edit.tsx`
- `crud/{namespace}/list/Content.tsx`
- `crud/{namespace}/modify/Navigation.tsx`
- `crud/{namespace}/modify/Content.tsx`
- `crud/{namespace}/modify/form/{FormName}.tsx`
- `crud/general/...` for shared fallbacks

### Minimal override example

```tsx
import { AsTemplate, Block, Extend, Parent, Translation as T } from '@dakataa/crud-react';

export default AsTemplate(() => {
  return (
    <section className="custom-list">
      <header>
        <Block name="title">
          <h2><T>Custom list title</T></h2>
        </Block>
      </header>

      <main>
        <Block name="content" />
      </main>
    </section>
  );
}, { name: 'list' });
```

Example of extending an existing template block:

```tsx
import { Extend, Parent } from '@dakataa/crud-react';

export default function CustomModifyNavigation() {
  return (
    <Extend name="navigation">
      <Parent />
      <a href="/help" className="btn btn-sm btn-outline-secondary">Help</a>
    </Extend>
  );
}
```

## Routing

The package exports its own lightweight router:

```tsx
import { Router, Route, Outlet } from '@dakataa/crud-react';
```

Example:

```tsx
<Router>
  <Route element={<MainLayout><Outlet /></MainLayout>}>
    <Route path="*" element={<CrudLoader />} />
  </Route>
</Router>
```

### Route generation

`UseActions()` exposes helpers for route generation and matching:

- `getAction(entity, name, namespace?)`
- `getActionByPath(path)`
- `getOnClickActionByPath(path)`
- `generateActionLink(onClickAction)`
- `generateRoute(route, parameters?, query?)`
- `generatePath(pattern, parameters?, query?)`
- `navigate(to, replace?)`

### Using a URL prefix

If your admin panel lives under `/admin`, configure a prefix:

```tsx
<Crud
  config={{
    link: {
      prefix: 'admin',
    },
  }}
>
  <Router>
    <Route path="*" element={<CrudLoader />} />
  </Router>
</Crud>
```

This lets internal CRUD routes stay backend-friendly while browser URLs include the app prefix.

## Forms

The add/edit screens are driven by `form.modify.view`.

Default behavior:

1. `CrudLoader` resolves the current action
2. `DataProvider` fetches the payload for that action
3. `Modify` renders the page or modal
4. `CrudForm` renders fields from `form.modify.view`
5. On submit, the current action is re-issued as `POST`
6. If the response is successful and contains a redirect, the UI navigates automatically

### Default form rendering

```tsx
import { Modify } from '@dakataa/crud-react';

export default function EditArticle() {
  return <Modify />;
}
```

### Lower-level form API

If you need custom rendering around the form schema:

```tsx
import {
  CrudForm,
  FormFieldViewLoader,
  FormRest,
  FormRestError,
  FormViewProvider,
} from '@dakataa/crud-react';
```

Useful helpers:

- `UseFormView()`: access the current form view node
- `FormFieldViewLoader`: render fields from the current schema node
- `FormRest`: render non-explicitly-rendered fields
- `FormRestError`: render non-explicitly-rendered errors

## Hooks and contexts

### `UseActions()`

Access loaded actions, route matching, link generation and programmatic navigation.

### `UseCurrentAction()`

Get the current resolved CRUD action and update it from inside a view.

### `UseDataProvider()`

Access the current action payload loaded by `DataProvider`.

### `GetData(...)`

Fetch arbitrary data through the configured CRUD requester.

```tsx
const { results, status, refresh, cancel } = GetData({
  path: '/article',
});
```

### `GetDataByAction(...)`

Fetch data using an `OnClickAction`.

```tsx
const data = GetDataByAction({
  action: {
    action: {
      entity: 'Article',
      name: 'list',
    },
  },
});
```

Returned shape:

```ts
type GetDataType = {
  url: string;
  status: number;
  results: any;
  response?: Response;
  refresh: () => void;
  cancel: () => void;
};
```

### `UseList()` and `UseListItem()`

Helpers for building custom list layouts and row renderers.

### `UseModal()`

Open CRUD actions inside modals.

```tsx
const { openModal, closeModal } = UseModal();
```

### `UseAlert()`

Open confirm, success, warning and error dialogs.

```tsx
const { open } = UseAlert();
```

### `UseConfig()`

Access the merged CRUD configuration from context.

## Core components

### `Crud`

Top-level provider that wires config, alerts, modals, preloaders and action state.

### `CrudLoader`

Resolves the current URL to a CRUD action and loads the matching view.

### `List`

Default list view with filters, sorting, batch actions and pagination.

### `Modify`

Default add/edit view with built-in success and error handling.

### `GridView`

Bootstrap table renderer used by the default list template. Can be customized with `config.options` or component props.

### `DynamicView`

Loads a namespace-aware template file and falls back to children when no override exists.

### `Modal` and `UseModal`

Render CRUD screens inside nested modals.

### `UseAlert`

Display animated alerts and confirmation dialogs.

### `Link`, `Button`, `Translation`, `Money`, `Dropdown`

Reusable building blocks for custom CRUD templates.

## Troubleshooting

### `Invalid Configuration.`

`CrudLoader` throws this when `CrudConfiguration(...)` has not been called before rendering the CRUD tree.

### `404 Not Found`

This usually means the current browser URL does not match any action returned by `/_crud/actions`.

Check:

- the backend action route
- the current browser path
- `config.link.prefix`
- whether actions were loaded successfully

### `View "..." Not found`

This means no built-in view or dynamic template matched the resolved action name.

Check:

- that your action name is one of the supported defaults, or
- that you created the corresponding template file in `./crud/**`

### Templates are not loading

Check:

- that `templates: import.meta.glob('./crud/**')` is passed to `CrudConfiguration(...)` or `<Crud config={...}>`
- that the file name matches the normalized PascalCase view name
- that the file is under the expected namespace or `crud/general`

### Actions are stale

The action list is cached in `sessionStorage`. If your backend action definitions changed, clear session storage and reload.

## Notes

If you want, the next useful step is to split this README into:

- a shorter package README for npm/GitHub
- a `/docs` folder with standalone guides such as `backend-contract.md`, `templates.md`, `forms.md`, and `recipes.md`

That usually makes the onboarding flow easier for new users.
