# CRUD Dashboard React (Frontend)
This is a frontend react implementation of CRUD.
Easy way to create CRUD ADMIN panel / Dashboard for your software.

This library depend on [@dakataa/crud](https://github.com/dakataa/crud) which is CRUD REST API; however, it can also be used as a standalone
if you provide the correct data structure. The components are based on the Bootstrap Framework.

### Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Examples](#examples)
4. [Components](#components)
   - [Grid](#GridView)
   - [Form](#form)
   - [Templating](#templates)
   - [Dynamic View](#dynamic-view)
   - [Modal](#modal)
   - [Alert](#alert)
   - [Navigation](#navigation)
5. Layout
6. [Hooks](#hooks)


### Installation

#### Using npm:
```shell
npm install @dakataa/crud-react
```

#### Using yarn:
```shell
yarn add @dakataa/crud-react
```

### Configuration


```ts
import {CrudConfiguration} from "@dakataa/crud-react";

CrudConfiguration({
	connection: {
		baseURL: 'https://crud-rest-api.local'
	}
});
```

### Example

#### Example with *react-router*
main.tsx

```jsx
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Crud, CrudConfiguration, MainLayout, Router, Route, Outlet} from "@dakataa/crud-react";

const templates = import.meta.glob('./crud/**');

CrudConfiguration({
	connection: {
		baseURL: 'https://project.local',
		headers: {
			Accept: 'application/json'
		}
	},
	templates: import.meta.glob('./crud/**')
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Crud
			config={{templates, currency: 'BGN', locale: 'bg', env: import.meta.env.CRUD_ENV}}
			errorFallback={<CrudErrorFallback/>}
		>
			<Router>
				<Route element={<MainLayout><Outlet/></MainLayout>}>
					<Route path={"*"} element={<CrudLoader/>}/>
				</Route>
			</Router>
		</Crud>
	</StrictMode>
)
```


### Legend
* Action
  * **Entity** - Model Name (Article)
  * **Namespace**
  * **Route** - API Endpoint information.

## Routing

## Hooks
### Data Provider

`GetDataByAction` is a Hook that allows you to fetch data based on CRUD action (see section [Actions](#legend)).

```js
const {
	results,
	setAction,
	setParameters,
	setQueryParameters,
	refresh
} = GetDataByAction({action});
```

### Actions

CRUD Actions is a collection of entity routes

`UseActions` is Hook that allows you to get all available [CRUD Actions].
```js
const {actions, getAction, getActionByPath} = UseActions();
```


## Components
### Dynamic View
### Router
### Templates
### Modal
### Dropdown
### Translation
### Types
