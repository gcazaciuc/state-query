# state-query
A declarative and functional state management solution

STATE is the number one enemy of reliable apps, eg see the famous [Out of the Tar Pit paper](http://curtclifton.net/papers/MoseleyMarks06a.pdf). 

However, existing state management solutions are either to tied to a specific framework, need a whole lot of other pieces to be able
to manipulate that state(eg think Redux reducers, selectors, sagas, thunks etc) or are downright incomplete.

Also, most of them, don't tackle at all the problem of component local state.

Besides that I would really like if there was a state management solution that could handle component local state with elegance.


## Design goals

* Fully declarative syntax
* Functional programming paradigm
* View layer agnostic: works with React, Preact and any other virtual DOM solution
* Pluggable drivers for syncing state contents: sync with Restfull APIs, local storage etc
* Fully traceable and replayable actions and state
* Minimum boilerplate
* Fractal architecture: It should compose well as the components it provides data to are integrated into larger components/apps
* Local(UI) state management
* Access to data results is fully asynchronous: the client is oblivious whether the data is local or on some remote server in the other part of the world
* Usefull, strong typing capabilities in dev, without having the developer commited to Typescript/Flow etc
* Immutable oriented, explicit state updates

We borrow liberaly ideas from:

1. GraphQL
2. SQL
3. CQRS(Command Query Responsability Segregation)
4. Event sourcing
5. And of course functional reactive programming approaches

The basic idea is to describe the data, the reads(queries) and the writes(mutations) using a declarative language.
The queries will all be reactive and the UI components update automatically as the queries result change in real-time.

We synchronize in a declarative manner the data with remote endpoints(eg REST endpoint) or local data stores( eg save in localStorage).

## API design ideas

I would love to get some input as I'm iterating on an API design for the library.
The API surface should be minimal.

All state management will be accomplished using 5 API functions:

1. `query` -> defines a query
2. `mutation` -> defines a mutation
3. `schema` -> Defines a schema for a table
3. `run` -> executes a query or a mutation
4. `sync` - performs side effects by synchronizing a table using pluggable drivers: make requests, local storage etc.

Framework specific bindings to the state management layer should reside in a separate package, eg `state-query-react`, `state-query-angular` etc.


### Proposed usage

### Define a schema for virtual 'tables' which will hold data and define side effects
```js

import { schema, run } from 'state-query';

export const createUsersTableSchema = schema`create table users (
    user_id int,
    last_name varchar(255),
    first_name varchar(255),
    address varchar(255),
    city varchar(255) 
)`

run(createUsersTableQuery);
// Upon changing the users table auto sync it with a REST API and local stoage
sync(createUsersTableSchema, restAdapter({
    url: '/users'
}), localStorageAdapter({
    key: 'users'
}));

```

The adapter can be provided independently of the `state-query` lib and can be created also by the users to acomplish custom effects and have
full control over what/when should be synced.

Based on the schema, data will be validated upon insertion, update etc.

### Creating queries and mutations

`SQL` is already a super well know, DECLARATIVE, query language. The proposed API aims at using a small subset of SQL
to **describe** the data needs of a component and **describe** the changes that need to be performed(insert, delete, update).

Any kind of data needs should be accomplished by 2 types of operations: `queries` or `mutations`.
Defining these should be natural adn the proposed API uses 2 tagged template literals which are very well supported in existing browsers( for a description of tagged template literals see
https://medium.freecodecamp.org/es6-tagged-template-literals-48a70ef3ed4d ):

* const getAllUsers = query`select * from users`;
* const deleteUser = mutation`delete from users where user_id=${(props) => props.userId}`

Tagged template literals will be used in a similar manner to how [Styled components](https://www.styled-components.com/) use them.

### Hooking up components to the state

Assuming we have the following queries defined:

```js
// Queries.js
const getAllUsers =  query`select * from users`;
const getUIState = query`select isOpen from users_list_ui`;
```
And the following mutations:

```js
// Mutations.js
const deleteUser = mutation`delete from users where user_id=${(props) => props.userId}`
```

And a component that uses these queries and mutations
```js
// UserList.js
import { getAllUsers, getUIState } from 'Queries.js';
import { deleteUser } from 'Mutations.js';
// State query react will contain the React bindings to the state query library
import { component } from 'state-query-react';

@component({
    users:  getAllUsers,
    isDropdownOpen: getUIState
    onDeleteUSer: deleteUser,
})
class UsersList extends React.Component {
    onDeleteUser(ev) {
        this.props.deleteUser(ev.data.id);
    }
    render() {
        <ul>{
            this.props.users.map((usr) => (<li>{usr.name}</li>))
        }
        </ul>
    }
}
```

Points to note:

1. The component will not be rendered until the required data is available
2. The queries should be **reactive** - when new data is added/deleted/updated in users table the component that uses it should update
3. The decorator can inject info about the loading state of the data(eg whether done or not) so the UI can update and show a spinner