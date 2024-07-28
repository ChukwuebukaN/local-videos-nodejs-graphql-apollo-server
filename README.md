GRAPHQL SEVER - WITH APOLLO - PROJECT

1 - Apollo Server

- an apollo server is a graphql library used to start up a graphql server
- it also automically starts up the apollo explorer on localhost
- create a folder for your project
- open it in vscode
- - run -( npm init --yes && npm pkg set type="module" )- to create a package.json with default settings
- - run -( npm install @apollo/server graphql )-

2 - Index.js

- - run -( touch index.js )-
- see example code inside file
- this is where we connect Apollo to GraphQL

3 - Schema.js

- - run -( touch schema.js )-
- - install vscode extensions -( GraphQL Syntax Highlighting, Apollo GraphQL )- to get schema suggestions when typing graphql, by also adding #graphql to each schema (see example code inside file)
- basic 5 types in graphQL schemas include: int (whole numbers), float (decimal numbers), string, boolean, ID.
- to mark a type as required in graphQL we use "!" sign, if not then it is allowed to be null.
- after adding schema types we need to export them in a query type

4 - Database

- we use a demo database, but you can connect any datatbase to it
- - run -( touch db.js )- then drop a demo data of arrays and object
- see example code inside file

5 - Resolvers

- here he define the data we want to return to users from the db
- apollo helps us select what data columns to return
- we just pass the table of the requestted on our database to apollo

6 - Starting the server

- - run -( npx nodemon index )-
- nodemon helps us to watch and restart our server when we make and save changes
- nodemon also hepls us check for error befor successfully starting our server

7 - Apollo Explorer

- when our server is started successfully, we open http://localhost:4000/ in our browser to see apollo explorer
- SCHEMA: here we see a list of different queries we can currently make, data types, etc.
- EXPLORER: this is where we make queries and get our response.

8 - Request

- Examples Request
-
- 1 - GET All data - getting all data in tables
- - query GamesQuery {
    games {
    title,
    platform
    }
    }
- - query GamesQuery {
    authors {
    name,
    verified
    }
    }
- - query GamesQuery {
    reviews {
    id,
    rating,
    content
    }
    }
-
- 2 - GET Specific data - getting specific data from tables passing an id
- here we update the schema and resolver to handle specific data by id.
- in apollo explorer you add a variable like below, to be passed to the query in example also below.
- - INSIDE OUR VARIABLES {
    "id": "1"
    }
- - query ReviewQuery($id: ID!) {
    review(id: $id) {
    rating,
    content
    }
    }
- - query GameQuery($id: ID!) {
    game(id: $id) {
    title,
    platform,
    id
    }
    }
-
- 3 - GET Related data - getting specific data from tables passing an id
- we make changes to our schema, and resolver to let users get related data or deeply nested data.
- - INSIDE OUR VARIABLES {
    "id": "2"
    }
- - query GameQuery($id: ID!) {
    game(id: $id) {
    id
    title,
    review {
    rating,
    content
    },
    }
    }
- - query ReviewQuery($id: ID!) {
    review(id: $id) {
    rating
    game {
    title,
    platform
    review {
    rating
    }
    },
    }
    }
-
- 4 - MUTATIONS (create, update, delete) - editing or mutating data in the tables.
- we make changes to our schema, and resolver to let users delete specific data.
- if you are using a local db.js file, it will not persist the mutation.
- - INSIDE OUR INSIDE OUR VARIABLES {
    "id": "2",
    "edits": {
    "title": "Apex Legends 2",
    "platform": ["pc", "ps5", "switch", "xbox"],
    }
    }
- - mutation AddMutation($game: AddGameInput!) {
    addGame(game: $game) {
    id,
    title,
    platform
    }
    }
- -
- - mutation DeleteMutation($id: ID!) {
    deleteGame(id: $id) {
    id,
    title,
    platform
    }
    }
- -
- - mutation EditMutation($edits: EditGameInput!, $id: ID!) {
    editGame(edits: $edits, id: $id) {
    title,
    platform
    }
    }
