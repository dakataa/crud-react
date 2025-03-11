# CRUD Dashboard React (Frontend)

## Setup

### Install packages
```
yarn install @dakataa/crud-react
```


### Configuration
Base way to configure and use it.

main.tsx
```jsx
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {Crud, CrudConfiguration} from "@dakataa/crud-react";

CrudConfiguration('https://rent.local');

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<YourLayout/>}>
					<Route path={"*"} element={<Crud/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
```

## Overview

### Legend
* Action
  * **Entity** - Model Name (Article)
  * **Namespace**
  * **Route** - API Endpoint information.

## Routing

## Hooks
### Data Provider

`GetData` is a Hook that allows you to fetch data based on CRUD action (see section [Actions](#legend)).

```js
const {
	results,
	setParameters,
	setQueryParameters,
	refresh
} = GetData({entityAction: action});
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
