# TS AWS Lambda
This is the template for an AWS Lambda function written in Typescript and deployed using [Serverless]('https://www.serverless.com/').

## Architecture
The REST API consists of 4 layers namely: Controllers, Services, Clients and Repositories.

### Handlers
Handlers are the entry points for a Lambda function  Each handler relates to a single function and receives the request or invocation.

### Services
The services layer lies below the handler layer. This layer contains all the logic in the app. Services also have a one-to-many relationship with repositories and clients.

Service layers receive their dependencies through their constructors and will receive in-memory versions of these dependencies for testing

### Clients
Clients are a subset of services which communicate with 3rd party services such as Auth0 and Sumsub. Clients are defined using a Typescript interface and are stubbed with in-memory versions for unit testing.

### Repositories
Repositories are the deepest layers of the app. These layers communicate with the database and perform only CRUD operations. No logical operations may be performed in the repository layer. A repository may also communicate wih only one collection in the database. Repositories are defined using a Typescript interface and are stubbed with in-memory versions for unit testing.