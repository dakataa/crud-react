# Dakataa Admin Dashboard

## Setup

### Install packages
```
yarn install dakataa/admin-react
```

### Configure ENV Variables
Copy `.env` to `.env.local` and set variables

```
REACT_APP_API_BASE_URL=https://example.com/dakataa/crud
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
