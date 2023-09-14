# ts-express-rest-api

This is an example of a REST API written using the Express framework

## Tech stack
### Language and Framework
The REST API uses the [ExpressJS](https://expressjs.com/) framework and is written using [Typescript](https://www.typescriptlang.org/).

### Authentication
Authentication middleware examples for [Auth0](https://auth0.com/) and [Firebase](https://firebase.com/) are provided.

### Database
Repository layers communicating with [Firebase Firestore Database](https://firebase.google.com/docs/firestore) and [MongoDB](https://www.mongodb.com/) are provided.

## Architecture
The REST API consists of 4 layers namely: Controllers, Services, Clients and Repositories.

### Controllers
Controllers are the top most level of the REST API and handle the HTTP requests. It is important to note that this is the only entity in the entire api the implements HTTP. All other layers are designed in such a manner that they could be used with other protocols as well.

Each entity in the api has a controller eg: `Users` have a `userController`. Controllers have a one-to-many relationship with services, and repositories.

Dependencies are injected into controllers through their constructors.

### Services
The services layer lies below the Controller layer. This layer contains all the logic in the REST API. Services also have a one-to-many relationship with repositories and clients.

### Clients
Clients are a subset of services which communicate with 3rd party services such as Auth0 and Sumsub. Clients are defined using a Typescript interface and are stubbed with inMemory versions for unit testing.

### Repositories
Repositories are the deepest layer in the API. The layers communicate with the database and perform only CRUD operations. No logical operations may be performed in the repository layer. A repository may also communicate wih only one collection in the database. Repositories are defined using a Typescript interface and are stubbed with inMemory versions for unit testing.



1. Install all packages using `yarn install`
2. Build the repo using `yarn build`
3. Run the solution using a live server app such as [nodemon]('https://nodemon.io/')