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
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import {Crud, CrudConfiguration, MainLayout} from "@dakataa/crud-react";

CrudConfiguration({
	baseURL: 'https://project.local',
	headers: {
		Accept: 'application/json'
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout><Outlet/></MainLayout>}>
					<Route path={"*"} element={<Crud/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
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
	setParameters,
	setQueryParameters,
	refresh
} = GetDataByAction({entityAction: action});
```

### Actions

CRUD Actions is a collection of entity routes

`UseActions` is Hook that allows you to get all available [CRUD Actions].
```js
const {actions, getAction, getActionByPath} = UseActions();
```


## Components
### Dynamic View

### Templates
### Modal
### Dropdown
### Translation
### Types
